import dotenv from "dotenv";
import path from "path";

const dotenvPath = path.join(__dirname, "../.env");
dotenv.config({path: dotenvPath});

export const config = {
    kind: process.env.ENV_KIND ?? "Dev",
    frontend: {
        host: process.env.FRONTEND_HOST ?? "localhost",
        port: Number(process.env.FRONTEND_PORT ?? "3000"),
        secret: process.env.FRONTEND_SECRET ?? "default_secret"
    },
    backend: {
        host: process.env.BACKEND_HOST ?? "localhost",
        port: Number(process.env.BACKEND_PORT ?? "4000"),
        secret: process.env.BACKEND_SECRET ?? "default_secret"
    },
    database: {
        host: process.env.DATABASE_HOST ?? "localhost",
        port: Number(process.env.DATABASE_PORT ?? "5000"),
        user: process.env.DATABASE_USER ?? "default_user",
        pass: process.env.DATABASE_PASS ?? "default_pass",
        name: process.env.DATABASE_NAME ?? "simplytasks"
    },
};
