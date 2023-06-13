import express, {Application, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";

import { config } from "@simplytasks/common";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: `${config.frontend.host}:${config.frontend.port}`,
    optionsSuccessStatus: 200,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(helmet());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({msg: "Hello from the backend!"});
});

app.use("/user", userRouter);
app.use("/post", postRouter);

// Listen
const server = app.listen(config.backend.port, config.backend.host, ()=>{
    console.log(`Listening on ${config.backend.host}:${config.backend.port}`);
});
