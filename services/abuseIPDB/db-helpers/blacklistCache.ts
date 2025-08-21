import type mongoose from "mongoose";
import blacklistCacheModel from "../models/blacklistcache";
import type { AbuseIPDBBlacklistDataType } from "../types";

export const isBlacklistEmpty = async (): Promise<boolean> => {
    const count = await blacklistCacheModel.countDocuments();
    return count === 0;
};

export const bulkSelectBlacklist = async (
    limit: number
): Promise<AbuseIPDBBlacklistDataType[]> => {
    return await blacklistCacheModel.aggregate([
        {
            $match: {},
        },
        {
            $limit: limit,
        },
    ]);
};

export const bulkInsertBlacklist = async (
    blacklistData: AbuseIPDBBlacklistDataType[]
): Promise<void> => {
    if (blacklistData.length === 0) {
        console.log("No data to insert into blacklist cache");
        return;
    }

    try {
        await blacklistCacheModel.insertMany(blacklistData);
        console.log("Blacklist data inserted successfully");
    } catch (error) {
        console.error("Error inserting blacklist data:", error);
    }
};

export const bulkDeleteBlacklist = async (
    ids: string[] | mongoose.Types.ObjectId[]
): Promise<void> => {
    try {
        const result = await blacklistCacheModel.deleteMany({
            _id: { $in: ids },
        }); // Delete all documents
        console.log(result.deletedCount, "Blacklist data deleted successfully");
    } catch (error) {
        console.error("Error deleting blacklist data:", error);
    }
};
