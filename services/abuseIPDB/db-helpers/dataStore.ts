import DataStore from "../models/dataStore";

export const getDataStoreValue = async (
    key: string
): Promise<string | null> => {
    try {
        const data = await DataStore.findOne({ key });
        return data ? data.value : null;
    } catch (error) {
        console.error("Error fetching data store value:", error);
        return null;
    }
};

export const setDataStoreValue = async (
    key: string,
    value: string
): Promise<void> => {
    try {
        await DataStore.updateOne(
            { key },
            { $set: { value } },
            { upsert: true }
        );
    } catch (error) {
        console.error("Error setting data store value:", error);
    }
};
