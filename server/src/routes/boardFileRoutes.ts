import { Router } from 'express';

import { BoardFileController } from '../controllers/boardFileController';
import { FileManager } from '../fileManager';

export class BoardFileRoutes {
    private controller: BoardFileController;
    private fileManager: FileManager;
    public router: Router;

    constructor() {
        this.fileManager = FileManager.getInstance();
        this.controller = new BoardFileController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get("/:boNo", this.controller.getList);
        this.router.post("/:boNo", this.fileManager.uploads.single("file"),
            this.controller.create);
    }

}