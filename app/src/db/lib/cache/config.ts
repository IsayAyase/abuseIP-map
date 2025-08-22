const cacheConfig = {
    expiration: 60 * 60, // 60 minutes
    cacheKeyPrefix: "coordsCache",
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    REDIS_SOCKET: {
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string),
    },
};

export default cacheConfig;
