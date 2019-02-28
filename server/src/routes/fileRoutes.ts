import { Router } from 'express';

import { FileController } from '../controllers/fileController';

export class FileRoutes {

    private controller: FileController;
    public router: Router

    public constructor() {
        this.controller = new FileController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get("/:fileName", this.controller.get);
        this.router.post("/", this.controller.create);
    }
    
}