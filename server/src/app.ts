import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import { IndexRoutes } from "./routes/indexRoutes";

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
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void {
        this.app.use('/', new IndexRoutes().router);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server: Server = new Server();
server.start();