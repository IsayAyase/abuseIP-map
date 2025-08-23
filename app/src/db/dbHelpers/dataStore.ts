import connectDB from "../connect";
import { getFromCache, setInCache } from "../lib/cache/cacheInRedis";
import DataStore from "../models/dataStore";

export const getDataStoreValueFromDB = async (key: string) => {
    const dataFromCache = await getFromCache(key);
    if (dataFromCache) return dataFromCache;

    await connectDB();
    try {
        const data = await DataStore.findOne({ key });
        await setInCache(key, data);
        return data;
    } catch (error) {
        console.error("Error fetching data store value:", error);
        return null;
    }
};
