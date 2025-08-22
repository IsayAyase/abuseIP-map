import AbuseIpWithInfo from "../models/abuseIpWithInfo";
import type { AbuseIpWithInfoType } from "../types";

export const insertAbuseIpWithInfo = async (
    abuseIpWithInfo: AbuseIpWithInfoType[]
): Promise<boolean> => {
    try {
        if (!Array.isArray(abuseIpWithInfo) || abuseIpWithInfo.length === 0)
            return false;

        const bulkOps = abuseIpWithInfo.map((entry) => {
            if ("_id" in entry) {
                // Remove _id to avoid conflicts during upsert
                delete (entry as Partial<typeof entry>)._id;
            }
            return {
                updateOne: {
                    filter: { ipAddress: entry.ipAddress },
                    update: { $set: entry },
                    upsert: true,
                },
            };
        });

        const opsRes = await AbuseIpWithInfo.bulkWrite(bulkOps);
        if (opsRes && opsRes.modifiedCount > 0) {
            console.log(
                opsRes.modifiedCount + opsRes.upsertedCount,
                `AbuseIpWithInfo records modified or inserted successfully`
            );
        } else {
            console.log("No records were modified or inserted");
        }
        return true;
    } catch (error) {
        console.error("Error inserting abuseIpWithInfo:", error);
        return false;
    }
};
