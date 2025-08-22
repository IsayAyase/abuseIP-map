import mongoose from "mongoose";
import PIPELINE_CONFIG from "../configs/pipelineConfig";
import type { AbuseIpWithInfoType, IpInfoType } from "../types";

const IpInfoTypeSchema = new mongoose.Schema<IpInfoType>(
    {
        status: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        regionName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
        isp: {
            type: String,
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
    },
    {
        id: false,
        _id: false,
        // no id, use your brain, genius!
    }
);

const abuseIpWithInfoSchema = new mongoose.Schema<AbuseIpWithInfoType>(
    {
        ipAddress: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        abuseConfidenceScore: {
            type: Number,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        lastReportedAt: {
            type: Date,
            required: true,
        },
        ipInfo: {
            type: IpInfoTypeSchema,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

abuseIpWithInfoSchema.index(
    { lastReportedAt: 1 },
    {
        expireAfterSeconds: PIPELINE_CONFIG.DB_ABUSE_IP_WITH_INFO_EXPIRATION,
    }
);

const AbuseIpWithInfo = mongoose.model(
    "AbuseIpWithInfo",
    abuseIpWithInfoSchema
);
export default AbuseIpWithInfo;
