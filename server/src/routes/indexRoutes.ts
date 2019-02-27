import { Router } from 'express';

import { IndexController } from '../controllers/indexController';

export class IndexRoutes {

    public router: Router

    public constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', new IndexController().getOne);
    }
    
}