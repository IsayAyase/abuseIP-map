import mongoose from "mongoose";
import envvars from "../constants/envvars";

export const connectDb = () =>
    mongoose.connect(envvars.MONGO_URI, {
        dbName: "abuseipmap",
    });
