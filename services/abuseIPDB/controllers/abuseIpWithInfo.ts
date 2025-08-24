import type { Request, Response } from "express";
import store from "../configs/store";
import { APIError } from "../lib/error";
import abuseIpWithInfoPipeline from "../pipelines/abuseIpWithInfoPipeline";

export const abuseIpWithInfoController = async (
    req: Request,
    res: Response
) => {
    try {
        if (
            store.values.status === "STARTED" ||
            store.values.status === "PROCESSING"
        ) {
            throw new APIError({
                message: "Data processing in progress",
            });
        }

        store.setStoreValueFor("status", "STARTED");
        store.setStoreValueFor("status", "PROCESSING");

        await abuseIpWithInfoPipeline();

        store.setStoreValueFor("status", "COMPLETED");

        res.status(200).json({
            success: true,
            message: "Data processed and saved",
        });
    } catch (error) {
        store.setStoreValueFor("status", "ERROR");
        console.error("Error in abuseIpWithInfoController:", error);
        if (error instanceof APIError) {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
        store.setStoreValueFor("status", "ERROR");
    }
};
