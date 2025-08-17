import type { AbuseIpWithInfoType, IpInfoType } from "@/db/types";
import mongoose from "mongoose";

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
        expireAfterSeconds: 30 * 24 * 60 * 60,
        // dont know how to make it more clear that it's 30 days in seconds, you moron!
    }
);

const AbuseIpWithInfo =
    mongoose.models.abuseipwithinfo ||
    mongoose.model("abuseipwithinfo", abuseIpWithInfoSchema);

export default AbuseIpWithInfo;
