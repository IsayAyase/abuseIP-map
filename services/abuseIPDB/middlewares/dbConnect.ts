import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import envvars from "../constants/envvars";

let isConnected = false;

const connectDB = async (req: Request, res: Response, next: NextFunction) => {
    if (isConnected) return;

    const db = await mongoose.connect(process.env.MONGO_URI!, {
        dbName: envvars.DBNAME,
    });

    isConnected = !!db.connections[0].readyState;
    console.log("> MongoDB connected");
    next();
};

export default connectDB;
