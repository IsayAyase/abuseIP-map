import store from "../configs/store";
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
    if (
        store.values.status === "STARTED" ||
        store.values.status === "PROCESSING"
    ) {
        throw new APIError({
            message: "Data processing in progress",
        });
    }

    store.setStoreValueFor("status", "STARTED");
    store.setStoreValueFor("status", "PROCESSING");

    console.log("Starting...");

    const isBlacklistCacheEmpty = await isBlacklistEmpty();
    if (isBlacklistCacheEmpty) {
        console.log("Blacklist cache is empty, fetching new data...");
        // ---------------------------------------------------------------------------
        const prevGenAt = await getDataStoreValueFromDB("abuseIpGeneratedAt");
        const prevGenAtTime = prevGenAt ? new Date(prevGenAt).getTime() : 0;
        const currentTime = new Date().getTime();
        const diff = currentTime - prevGenAtTime;
        const hours = Math.floor(diff / (60 * 60 * 1000));

        if (hours <= 6) {
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
        if (prevGenAt && prevGenAt === ipData.meta.generatedAt.toString()) {
            throw new APIError({ message: "No new data to process" });
        }
        await bulkInsertBlacklist(ipData.data);
        console.log("Blacklist data inserted into cache");
    }
    // ---------------------------------------------------------------------------

    const LIMIT = 100;
    let currentCount = 0;
    do {
        let ipDataChunks = await bulkSelectBlacklist(LIMIT);
        currentCount = ipDataChunks.length;
        if (currentCount === 0) {
            console.log("No more data to process");
            break;
        }
        const ips = ipDataChunks.map((ip) => ip.ipAddress);
        const ipInfo: IpInfoType[] = await fetchBulkIpInfo(ips);

        const mergedData = mergeAbuseIpdbAndIpInfo(ipDataChunks, ipInfo);
        const flag = await insertAbuseIpWithInfo(mergedData);
        if (flag) {
            throw new APIError({ message: "Error saving data to db" });
        }

        await bulkDeleteBlacklist(ips);
        console.log("\nData processed and saved");
        await sleep(5000);
    } while (currentCount === LIMIT || currentCount > 0);

    console.log("IpInfo fetched");
    // ---------------------------------------------------------------------------
};

export default abuseIpWithInfoPipeline;
