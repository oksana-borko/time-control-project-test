import dotenv from 'dotenv';
import appConf from "../../app-config/app-config.json" with { type: "json" };
dotenv.config();
export const configuration = {
    ...appConf,
    mongoUri: process.env.MONGO_URI || "dev db address",
    jwt: {
        secret: process.env.JWT_SECRET || "super-secret",
        exp: process.env.JWT_EXP || "1h"
    }
};
