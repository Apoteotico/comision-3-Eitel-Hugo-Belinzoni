import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {indexRoutes} from "../src/routes/index.routes.js"
import authRouter from "../src/routes/auth.routes.js";

const app = express();

app.use(express.json()); 
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/", indexRoutes);
app.use("/api", authRouter);
app.use(cors());

export default app;