import type { NextFunction, Request, Response } from "express";
import envvars from "../contants/envvars";

const accessCheck = (req: Request, res: Response, next: NextFunction) => {
    const accessKey = req.query.accessKey as string;
    if (accessKey !== envvars.SERVICE_ACCESS_KEY) {
        return res.status(401).json({
            success: false,
            message:
                "Unauthorized, get the correct access key, you pathetic lil shit!",
        });
    }
    next();
};

export default accessCheck;
