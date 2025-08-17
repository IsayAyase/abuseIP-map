import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }
    const conn = await mongoose.connect(MONGO_URI as string, {
        dbName: "abuseipmap",
    });

    isConnected = conn.connections[0].readyState === 1;
};
export default connectDB;
