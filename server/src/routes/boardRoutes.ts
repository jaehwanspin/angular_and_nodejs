import { Router } from 'express';

import { BoardController } from '../controllers/boardController';

export class BoardRoutes {

    public router: Router

    public constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', new BoardController().getOne);
    }
    
}