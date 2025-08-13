import mongoose from "mongoose";
import envvars from "../contants/envvars";

export const connectDb = () =>
    mongoose.connect(envvars.MONGO_URI, {
        dbName: "abuseipmap",
    });
