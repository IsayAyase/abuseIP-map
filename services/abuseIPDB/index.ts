import Express from "express";
import { connectDb } from "./configs/mongo";
import envvars from "./constants/envvars";
import router from "./routes/router";

const app = Express();

app.use(router);

app.listen(envvars.PORT, () => {
    connectDb()
        .then(() => {
            console.log("> Connected to db");
            console.log(`> Server running on port ${envvars.PORT}\n`);
        })
        .catch((error) => {
            console.error("> Error connecting to db:", error);
            process.exit(1);
        });
});
