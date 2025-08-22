import AbuseIpWithInfo from "@/db/models/abuseIpWithInfo";
import dayjs from "dayjs";
import mongoose from "mongoose";
import connectDB from "../connect";
import { getFromCache, setInCache } from "../lib/cache/cacheInRedis";
import type { AbuseIpWithInfoType, CoordOnlyInfoType } from "../types";

/**
 * @param reportedAt Date | string (YYYY-MM-DD)
 * @returns
 */
export const getCoordsOnlyAbuseIpWithInfo = async (): Promise<
    CoordOnlyInfoType[]
> => {
    try {
        const endOfDay = new Date();
        const startOfDay = new Date(endOfDay.getTime() - 24 * 60 * 60 * 1000);
        const cacheKey = dayjs(endOfDay).format("YYYY_MM_DD_hh_00");

        const cachedData = await getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        console.log("DB> Fetching coords from database");
        await connectDB();

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

        setInCache(cacheKey, abuseIpsWithInfo);
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
