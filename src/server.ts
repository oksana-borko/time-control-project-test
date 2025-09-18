import { launchServer } from "./app.js";
import { configuration } from "./config/timeControlConfig.js";
import * as mongoose from "mongoose";

mongoose.connect(configuration.mongoUri)
    .then(() => {
        console.log("✅ MongoDB successfully connected");
        launchServer();
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });
