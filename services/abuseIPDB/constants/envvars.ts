import { configDotenv } from "dotenv";

configDotenv({
    quiet: true,
});

const envvars = {
    ABUSE_IPDB_KEY: process.env.ABUSE_IPDB_KEY as string,
    MONGO_URI: process.env.MONGO_URI as string,
    SERVICE_ACCESS_KEY: process.env.SERVICE_ACCESS_KEY as string,
    PORT: parseInt((process.env.PORT as string) || "5000") || 5000,
    DBNAME: "abuseipmap",
    NODE_ENV: process.env.NODE_ENV as string,
};

export default envvars;
