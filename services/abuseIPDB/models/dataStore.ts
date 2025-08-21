import mongoose from "mongoose";

const dataStore = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const DataStore = mongoose.model("DataStore", dataStore);
export default DataStore;
