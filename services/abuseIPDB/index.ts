import fs from "fs";
import { chuckIps, mergeAbuseIpdbAndIpInfo } from "./lib/dataProcessors";
import { getBlacklist } from "./services/abuseIPDB";
import { getIpInfoForIpChunks } from "./services/ipPAI";

getBlacklist().then((ipData) => {
    const ips = chuckIps(ipData);
    getIpInfoForIpChunks(ips).then((ipInfo) => {
        // fs.writeFileSync("./ipInfo.json", JSON.stringify(ipInfo, null, 4));
        // console.log(ipInfo.length);
        const mergedData = mergeAbuseIpdbAndIpInfo(ipData, ipInfo);
        fs.writeFileSync("./merged.json", JSON.stringify(mergedData, null, 4));

        process.exit();
    });
});
