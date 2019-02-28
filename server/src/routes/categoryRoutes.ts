import { Router } from 'express';

import { CategoryController } from '../controllers/categoryController';

export class CategoryRoutes {

    private controller: CategoryController;
    public router: Router

    public constructor() {
        this.controller = new CategoryController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/:catNo', this.controller.get);
        this.router.get("/", this.controller.getList);
        this.router.post('/', this.controller.create);
        this.router.put('/', this.controller.update);
        this.router.delete('/:catNo', this.controller.delete);
    }
    
}