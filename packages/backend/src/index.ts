import express, {Application, Request, Response} from "express";
import { config } from "@simplytasks/common";
import userRouter from "./routes/user";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({msg: "Hello from the backend!"});
});

app.use("/user", userRouter);

// Listen
const server = app.listen(config.backend.port, config.backend.host, ()=>{
    console.log(`Listening on ${config.backend.host}:${config.backend.port}`);
});
