import mongoose from "mongoose";

const dataStore = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            enum: ["abuseIpGeneratedAt"],
        },
        value: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const DataStore = mongoose.model("DataStore", dataStore);
export default DataStore;
