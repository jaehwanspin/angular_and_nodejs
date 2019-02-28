import { Router } from 'express';

import { UserController } from '../controllers/userController';

export class UserRoutes {

    private controller: UserController;
    public router: Router

    public constructor() {
        this.controller = new UserController();
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/:usNo', this.controller.get);
        
        
        this.router.post('/', this.controller.getLogin);
    }
    
}