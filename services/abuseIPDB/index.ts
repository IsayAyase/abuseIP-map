import Express from "express";
import envvars from "./constants/envvars";
import router from "./routes/router";

const app = Express();

app.use(router);

app.listen(envvars.PORT, () => {
    console.log(`Server is running on port ${envvars.PORT}`);
});
