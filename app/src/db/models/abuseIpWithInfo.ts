import type { AbuseIpWithInfoType } from "@/db/types";
import mongoose, { type Model } from "mongoose";

const AbuseIpWithInfo = mongoose.models
    .abuseipwithinfo as Model<AbuseIpWithInfoType>;

export default AbuseIpWithInfo;
