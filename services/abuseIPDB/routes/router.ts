import { Router, type Request, type Response } from "express";
import { abuseIpWithInfoController } from "../controllers/abuseIpWithInfo";
import accessCheck from "../middlewares/accessKey";

const router = Router();
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "API is running" });
});

router.get("/abuseIpWithInfo", accessCheck, abuseIpWithInfoController);

export default router;
