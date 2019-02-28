import { Router } from 'express';

import { BoardController } from '../controllers/boardController';

export class BoardRoutes {
    private controller: BoardController;
    public router: Router

    public constructor() {
        this.controller = new BoardController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get("/:catNo/:boNo", this.controller.get);
        this.router.get("/:catNo", this.controller.getList);
        this.router.post("/", this.controller.create);
        this.router.put("/", this.controller.update);
        this.router.delete("/:boNo", this.controller.delete);
    }
    
}