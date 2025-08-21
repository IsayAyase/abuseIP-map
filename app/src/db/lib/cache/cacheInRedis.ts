import { createClient } from "redis";

const REDIS_USERNAME = process.env.REDIS_USERNAME as string;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;

const client = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
        host: "redis-13518.crce206.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 13518,
    },
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

    const keys = await client.KEYS(`coordsCache:*`);
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

    const exists = await client.EXISTS(`coordsCache:${date}`);
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

    const res = await client.SET(`coordsCache:${date}`, JSON.stringify(data));
    if (res === null) {
        throw new Error("Failed to set in cache");
    }
    console.log(`SET_REDIS> Set ${date} in cache`);
    autoRemoveFromCache(10);
};

/**
 * @param date - string (YYYY-MM-DD)
 * @param data
 */
export const getFromCache = async (date: string) => {
    await connect();

    const text = await client.GET(`coordsCache:${date}`);
    if (text === null) {
        return null;
    }
    console.log(`GET_REDIS> Got ${date} from cache`);
    return JSON.parse(text);
};
