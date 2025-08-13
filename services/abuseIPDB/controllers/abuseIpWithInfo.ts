import type { Request, Response } from "express";
import fs from "fs";
import { insertAbuseIpWithInfo } from "../db-helpers/abuseIpWithInfo";
import { chuckIps, mergeAbuseIpdbAndIpInfo } from "../lib/dataProcessors";
import { APIError } from "../lib/error";
import { getBlacklist } from "../services/abuseIPDB";
import { getIpInfoForIpChunks } from "../services/ipPAI";

export const abuseIpWithInfoController = async (
    req: Request,
    res: Response
) => {
    try {
        const ipData = await getBlacklist();
        if (!ipData) {
            throw new APIError({ message: "Error fetching blacklist" });
        }
        const ips = chuckIps(ipData);
        const ipInfo = await getIpInfoForIpChunks(ips);
        const mergedData = mergeAbuseIpdbAndIpInfo(ipData, ipInfo);
        const flag = await insertAbuseIpWithInfo(mergedData);
        if (flag) {
            throw new APIError({ message: "Error saving data to db" });
        }
        fs.writeFileSync("./merged.json", JSON.stringify(mergedData, null, 4));
        res.status(200).json({
            success: true,
            message: "Data processed and saved",
        });
    } catch (error) {
        console.error("Error in abuseIpWithInfoController:", error);
        if (error instanceof APIError) {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
};
