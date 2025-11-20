import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export default async function connectDB() {
    try {
        let dbURL;
        if (NODE_ENV === "development") {
            dbURL = DEV_DB_URL;
        } else if (NODE_ENV === "production") {
            dbURL = PROD_DB_URL;
        } else {
            throw new Error("Invalid NODE_ENV value");
        }

        await mongoose.connect(dbURL);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Error while connecting to mongoDB", error);
        process.exit(1);
    }
}