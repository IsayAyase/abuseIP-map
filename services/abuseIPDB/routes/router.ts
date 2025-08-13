import { Router } from "express";
import { abuseIpWithInfoController } from "../controllers/abuseIpWithInfo";
import accessCheck from "../middlewares/accessKey";

const router = Router();
router.get("/abuseIpWithInfo", accessCheck, abuseIpWithInfoController);

export default router;
