import AbuseIpWithInfo from "../models/abuseIpWithInfo";
import type { AbuseIpWithInfoType } from "../types";

export const insertAbuseIpWithInfo = async (
    abuseIpWithInfo: AbuseIpWithInfoType[]
): Promise<boolean> => {
    try {
        if (!Array.isArray(abuseIpWithInfo) || abuseIpWithInfo.length === 0)
            return false;

        const bulkOps = abuseIpWithInfo.map((entry) => ({
            updateOne: {
                filter: { ipAddress: entry.ipAddress },
                update: { $set: entry },
                upsert: true,
            },
        }));

        const opsRes = await AbuseIpWithInfo.bulkWrite(bulkOps);
        return opsRes.ok !== 1;
    } catch (error) {
        console.error(error);
        return false;
    }
};
