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
        this.router.post('/', this.controller.create);
        this.router.put('/', this.controller.update);
        this.router.delete('/:usNo', this.controller.delete);
        
        this.router.post('/login', this.controller.getLogin);
        this.router.post("/usIdValidated", this.controller.getUsIdValidated);
        this.router.post("/usEmailValidated", this.controller.getUsEmailValidated);
        this.router.post("/genEmailCode", this.controller.genEmailCode);
    }
    
}