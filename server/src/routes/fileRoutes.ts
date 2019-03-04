import { Router } from 'express';

import { FileController } from '../controllers/fileController';
import { FileManager } from '../fileManager';

export class FileRoutes {
    private fileManager: FileManager;
    private controller: FileController;
    public router: Router

    public constructor() {
        this.fileManager = FileManager.getInstance();
        this.controller = new FileController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get("/:fileName", this.controller.get);
        this.router.post("/", this.fileManager.uploads.single("file"),
            this.controller.create);
        this.router.delete("/:fileNo", this.controller.delete);
    }
    
}