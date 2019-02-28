import { Router } from 'express';

import { IndexController } from '../controllers/indexController';

export class IndexRoutes {

    private controller: IndexController;
    public router: Router

    public constructor() {
        this.controller = new IndexController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.delete('/', this.controller.index);
    }
    
}