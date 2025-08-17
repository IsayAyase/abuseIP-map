import AbuseIpWithInfo from "@/db/models/abuseIpWithInfo";
import fs from "fs";
import connectDB from "../connect";

export const getAbuseIpWithInfo = async (
    reportedAt: Date
): Promise<
    {
        _id: string;
        ipInfo: {
            lat: number;
            lon: number;
        };
    }[]
> => {
    try {
        await connectDB();

        const startOfDay = new Date(reportedAt);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(reportedAt);
        endOfDay.setHours(23, 59, 59, 999);

        const abuseIpsWithInfo = await AbuseIpWithInfo.aggregate([
            {
                $match: {
                    lastReportedAt: {
                        $gte: startOfDay,
                        $lte: endOfDay,
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    ipInfo: {
                        lat: 1,
                        lon: 1,
                    },
                },
            },
        ]);
        fs.writeFileSync(
            "./abuseIpWithInfo.json",
            JSON.stringify(abuseIpsWithInfo, null, 4)
        );
        return abuseIpsWithInfo;
    } catch (error) {
        console.error(error);
        return [];
    }
};
