import { Request, Response } from 'express';

import { Database } from '../database';
import { EmailManager } from "../emailManager";


export class IndexController {

    public async index(req: Request, res: Response): Promise<any> {
        /*var result: any = null;
        const db: Database = Database.getInstance();
        const { queryStr } = req.query;
        const query: string =
                "SELECT '안녕하세요' AS \"Message\" ";

        result = await db.pool.query(query);

        result = result[0];

        console.log("params : \n" + JSON.stringify(queryStr));

        res.json(result);*/
        const em: EmailManager = EmailManager.getInstance();
        const result: string = em.sendMail({
            to: "jaehwanspin@gmail.com",
            subject: "안녕하세요",
            text: '<button type="button">버튼입니다</button>'
        });

        res.json(result);
    }

}