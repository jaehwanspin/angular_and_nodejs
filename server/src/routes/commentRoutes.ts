import { Router } from 'express';

import { CommentController } from '../controllers/commentController';

export class CommentRoutes {
    private controller: CommentController;
    public router: Router

    public constructor() {
        this.controller = new CommentController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get("/:boNo", this.controller.getList);
        this.router.post("/", this.controller.create);
        this.router.put("/", this.controller.update);
        this.router.delete("/:comNo", this.controller.delete);
    }
    
}