import AbuseIpWithInfo from "@/db/models/abuseIpWithInfo";
import mongoose from "mongoose";
import connectDB from "../connect";
import { getFromCache, setInCache } from "../lib/cache/cacheInRedis";
import type { AbuseIpWithInfoType, CoordOnlyInfoType } from "../types";

/**
 * @param reportedAt Date | string (YYYY-MM-DD)
 * @returns
 */
export const getCoordsOnlyAbuseIpWithInfo = async (
    reportedAt: string
): Promise<CoordOnlyInfoType[]> => {
    try {
        const cachedData = await getFromCache(reportedAt);
        if (cachedData) {
            return cachedData;
        }

        console.log("DB> Fetching coords from database");
        await connectDB();

        const startOfDay = new Date(reportedAt);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(reportedAt);
        endOfDay.setHours(23, 59, 59, 999);

        const abuseIpsWithInfo: CoordOnlyInfoType[] =
            await AbuseIpWithInfo.aggregate([
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
                        coords: {
                            lat: "$ipInfo.lat",
                            lon: "$ipInfo.lon",
                        },
                    },
                },
            ]);

        setInCache(reportedAt, abuseIpsWithInfo);
        return abuseIpsWithInfo;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getAbuseIpWithInfoById = async (
    id: string
): Promise<AbuseIpWithInfoType | null> => {
    try {
        await connectDB();
        const abuseIpWithInfo = await AbuseIpWithInfo.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) },
            },
        ]);
        if (abuseIpWithInfo.length === 0) {
            return null;
        }
        return abuseIpWithInfo[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};
