import store from "../configs/store";
import { insertAbuseIpWithInfo } from "../db-helpers/abuseIpWithInfo";
import { getDataStoreValue, setDataStoreValue } from "../db-helpers/dataStore";
import { chuckIps, mergeAbuseIpdbAndIpInfo } from "../lib/dataProcessors";
import { APIError } from "../lib/error";
import { getBlacklist } from "../services/abuseIPDB";
import { getIpInfoForIpChunks } from "../services/ipPAI";

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

    // ---------------------------------------------------------------------------

    const ipData = await getBlacklist();
    if (!ipData) {
        throw new APIError({ message: "Error fetching blacklist" });
    }
    // fs.writeFileSync("./blacklist.json", JSON.stringify(ipData, null, 4));
    console.log("Blacklist fetched");

    // ---------------------------------------------------------------------------

    const prevGenAt = await getDataStoreValue("abuseIpGeneratedAt");

    if (prevGenAt && prevGenAt === ipData.meta.generatedAt.toString()) {
        throw new APIError({ message: "No new data to process" });
    } else {
        await setDataStoreValue(
            "abuseIpGeneratedAt",
            ipData.meta.generatedAt.toString()
        );
    }

    // ---------------------------------------------------------------------------

    const ips = chuckIps(ipData);
    const ipInfo = await getIpInfoForIpChunks(ips);
    // fs.writeFileSync("./ipInfo.json", JSON.stringify(ipInfo, null, 4));
    console.log("IpInfo fetched");

    // ---------------------------------------------------------------------------

    const mergedData = mergeAbuseIpdbAndIpInfo(ipData, ipInfo);
    const flag = await insertAbuseIpWithInfo(mergedData);
    if (flag) {
        throw new APIError({ message: "Error saving data to db" });
    }
    console.log("\nData processed and saved");
    store.setStoreValueFor("status", "COMPLETED");

    // fs.writeFileSync("./merged.json", JSON.stringify(mergedData, null, 4));
};

export default abuseIpWithInfoPipeline;
