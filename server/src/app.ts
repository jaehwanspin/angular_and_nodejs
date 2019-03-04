import express, { Application, } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import { IndexRoutes } from "./routes/indexRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { BoardRoutes } from "./routes/boardRoutes";
import { CategoryRoutes } from "./routes/categoryRoutes";
import { CommentRoutes } from "./routes/commentRoutes";
import { FileRoutes } from "./routes/fileRoutes";
import { BoardFileRoutes } from "./routes/boardFileRoutes";

class Server {

    private app: Application;

    public constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.set("port", process.env.PORT || 8888);
        this.app.use(morgan("combined"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: "50mb" }))
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    }

    private routes(): void {
        this.app.use('/', new IndexRoutes().router);
        this.app.use('/api/user', new UserRoutes().router);
        this.app.use("/api/board", new BoardRoutes().router);
        this.app.use("/api/category", new CategoryRoutes().router);
        this.app.use("/api/comment", new CommentRoutes().router);
        this.app.use("/api/file", new FileRoutes().router);
        this.app.use("/api/boardFile", new BoardFileRoutes().router);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server: Server = new Server();
server.start();