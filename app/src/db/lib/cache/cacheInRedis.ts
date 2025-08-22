import { createClient } from "redis";
import cacheConfig from "./config";

const client = createClient({
    username: cacheConfig.REDIS_USERNAME,
    password: cacheConfig.REDIS_PASSWORD,
    socket: cacheConfig.REDIS_SOCKET,
});

const connect = async () => {
    if (!client.isOpen) await client.connect();
};

/**
 * When executed, it will remove all files that are older than maxHistory days. Default is 7 days
 * @param maxHistory
 */
export const autoRemoveFromCache = async (maxHistory: number = 7) => {
    await connect();

    const dates = new Set<string>();
    for (let i = 0; i < maxHistory; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
        dates.add(date);
    }

    const keys = await client.KEYS(`${cacheConfig.cacheKeyPrefix}:*`);
    const removeKeys = keys.filter((key) => !dates.has(key.split(":")[1]));
    if (removeKeys.length === 0) return;

    const res = await client.DEL(removeKeys);
    if (res === null) {
        throw new Error("Failed to remove from cache");
    }

    console.log(`AUTO_REMOVE_REDIS> Removed old keys from cache`);
};

export const isInCache = async (date: string) => {
    await connect();

    const exists = await client.EXISTS(`${cacheConfig.cacheKeyPrefix}:${date}`);
    if (exists === null) {
        throw new Error("Failed to check if exists in cache");
    }
    return exists !== 0;
};

/**
 * @param date - string (YYYY-MM-DD)
 */
export const setInCache = async (date: string, data: any) => {
    await connect();

    const res = await client.SET(
        `${cacheConfig.cacheKeyPrefix}:${date}`,
        JSON.stringify(data),
        {
            expiration: {
                type: "EX",
                value: cacheConfig.expiration,
            },
        }
    );
    if (res === null) {
        throw new Error("Failed to set in cache");
    }
    console.log(`SET_REDIS> Set ${date} in cache`);
};

/**
 * @param date - string (YYYY-MM-DD)
 * @param data
 */
export const getFromCache = async (date: string) => {
    await connect();

    const text = await client.GET(`${cacheConfig.cacheKeyPrefix}:${date}`);
    if (text === null) {
        return null;
    }
    console.log(`GET_REDIS> Got ${date} from cache`);
    return JSON.parse(text);
};
