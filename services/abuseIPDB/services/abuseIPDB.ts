import envvars from "../constants/envvars";
import type { AbuseIPDBBlacklistType } from "../types";

export const getBlacklist = async (
    limit: number = 10000,
    minConfidence: number = 60
): Promise<AbuseIPDBBlacklistType | null> => {
    // if (fs.existsSync("./blacklist.json")) {
    //     console.log("Using cached blacklist");
    //     return JSON.parse(fs.readFileSync("./blacklist.json").toString());
    // }

    const url = `https://api.abuseipdb.com/api/v2/blacklist?limit=${limit}&minConfidence=${minConfidence}`;
    try {
        const response = await fetch(url, {
            headers: {
                Key: envvars.ABUSE_IPDB_KEY,
                Accept: "application/json",
            } as any,
        });
        if (!response.ok) {
            console.error("Error fetching blacklist:", response.status);
            return null;
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching blacklist:", error);
        return null;
    }
};
