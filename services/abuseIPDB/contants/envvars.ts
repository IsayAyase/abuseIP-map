import { configDotenv } from "dotenv";

configDotenv({
    quiet: true
});

const envvars = {
    ABUSE_IPDB_KEY: process.env.ABUSE_IPDB_KEY
}

export default envvars