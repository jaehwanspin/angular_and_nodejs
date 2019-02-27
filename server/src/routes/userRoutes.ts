import { Router } from 'express';

import { UserController } from '../controllers/userController';

export class UserRoutes {

    public router: Router

    public constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', new UserController().getOne);
    }
    
}