import mongoose from "mongoose";
import type { AbuseIPDBBlacklistDataType } from "../types";

const blacklistCacheSchema = new mongoose.Schema<AbuseIPDBBlacklistDataType>({
    ipAddress: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    abuseConfidenceScore: {
        type: Number,
        required: true,
    },
    lastReportedAt: {
        type: Date,
        required: true,
    },
});

const blacklistCacheModel = mongoose.model<AbuseIPDBBlacklistDataType>(
    "BlacklistCache",
    blacklistCacheSchema
);
export default blacklistCacheModel;
