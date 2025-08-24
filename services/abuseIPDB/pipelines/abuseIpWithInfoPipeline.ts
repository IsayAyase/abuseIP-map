import PIPELINE_CONFIG from "../configs/pipelineConfig";
import { insertAbuseIpWithInfo } from "../db-helpers/abuseIpWithInfo";
import {
    bulkDeleteBlacklist,
    bulkInsertBlacklist,
    bulkSelectBlacklist,
    isBlacklistEmpty,
} from "../db-helpers/blacklistCache";
import {
    getDataStoreValueFromDB,
    setDataStoreValueFromDB,
} from "../db-helpers/dataStore";
import { mergeAbuseIpdbAndIpInfo } from "../lib/dataProcessors";
import { APIError } from "../lib/error";
import { sleep } from "../lib/sleep";
import { getBlacklist } from "../services/abuseIPDB";
import { fetchBulkIpInfo } from "../services/ipPAI";
import type { IpInfoType } from "../types";

const abuseIpWithInfoPipeline = async () => {
    console.log("Starting...");

    const isBlacklistCacheEmpty = await isBlacklistEmpty();
    if (isBlacklistCacheEmpty) {
        console.log("Blacklist cache is empty, fetching new data...");
        // ---------------------------------------------------------------------------
        const prevGenAt = await getDataStoreValueFromDB("abuseIpGeneratedAt");
        const prevFetchTime = prevGenAt
            ? new Date(prevGenAt.updatedAt).getTime()
            : 0;
        const currentTime = new Date().getTime();
        const diff = currentTime - prevFetchTime;
        const hours = Math.floor(diff / (60 * 60 * 1000));

        if (
            hours <= PIPELINE_CONFIG.REFETCH_ABUSE_IP_WITH_INFO_AFTER_IN_HOURS
        ) {
            throw new APIError({
                message: `Last update was ${hours} hours ago. Please wait at least 6 hours to fetch new data.`,
            });
        }

        const ipData = await getBlacklist();
        if (!ipData) {
            throw new APIError({ message: "Error fetching blacklist" });
        }

        console.log("Blacklist fetched");

        // updatedAt here will tell the last time the data was fetched
        // prevGenAt is already fetched from the database, this won't affect value
        await setDataStoreValueFromDB(
            "abuseIpGeneratedAt",
            ipData.meta.generatedAt.toString()
        );
        if (
            prevGenAt &&
            prevGenAt.value === ipData.meta.generatedAt.toString()
        ) {
            throw new APIError({ message: "No new data to process" });
        }
        await bulkInsertBlacklist(ipData.data);
        console.log("Blacklist data inserted into cache");
    } else {
        console.log(
            "Blacklist cache is not empty, proceeding with existing data..."
        );
    }
    // ---------------------------------------------------------------------------

    const LIMIT = PIPELINE_CONFIG.CHUCK_SIZE;
    const MAX_ITERATIONS = PIPELINE_CONFIG.NUMBER_OF_ITERATIONS_PER_REQUEST;
    let currentCount = 0;
    let currentIteration = 0;
    do {
        let ipDataChunks = await bulkSelectBlacklist(LIMIT);
        currentCount = ipDataChunks.length;
        if (currentCount === 0) {
            console.log("No more data to process");
            break;
        }
        const ips = ipDataChunks.map((ip) => ip.ipAddress);
        const ids = ipDataChunks.map((ip) => ip._id);
        const ipInfo: IpInfoType[] = await fetchBulkIpInfo(ips);

        const mergedData = mergeAbuseIpdbAndIpInfo(ipDataChunks, ipInfo);
        const flag = await insertAbuseIpWithInfo(mergedData);
        if (!flag) {
            throw new APIError({ message: "Error saving data to db" });
        }

        await bulkDeleteBlacklist(ids);
        console.log("Data processed and saved \n");
        currentIteration++;
        await sleep(PIPELINE_CONFIG.SLEEP_BETWEEN_REQUESTS_IN_MS);
    } while (
        currentCount === LIMIT ||
        currentCount > 0 ||
        currentIteration <= MAX_ITERATIONS
    );

    console.log("IpInfo fetched");
    return;
    // ---------------------------------------------------------------------------
};

export default abuseIpWithInfoPipeline;
