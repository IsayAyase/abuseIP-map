import mongoose from "mongoose";

const dataStoreSchema = new mongoose.Schema(
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

const DataStore =
    mongoose.models.datastore || mongoose.model("datastore", dataStoreSchema);
export default DataStore;
