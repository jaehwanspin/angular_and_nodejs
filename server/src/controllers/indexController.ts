import { Request, Response } from 'express';
import fs from "fs";
import { Database } from "../database";

export class IndexController {

    public async getOne(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        var result: any = null;
        const query: string = `SELECT 'Hi Hello' AS \"Message\"`;

        result = await db.pool.query(query, [ 1 ]);
        result = result[0];

        res.json(result);
    }

}