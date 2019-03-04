import { Request, Response } from 'express';

import { Database } from "../database";

export class CommentController {

    public async getList(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { boNo } = req.params;

        const query: string =
                "SELECT * "
            + "    FROM vw_normalcomment "
            + "   WHERE boNo = ?";
        
        result = await db.pool.query(query, [ boNo ]);
        
        res.json(result);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const comment = req.body;

        const query = 
                "INSERT INTO tbl_comment(comContent, writer, boNo) "
            + "                   VALUES(         ?,      ?,    ?) ";

        await db.pool.query(query,
            [ comment.comContent, comment.writer, comment.boNo ]);

        res.json({ result: "success" });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const comment = req.body;

        const query = 
                "UPDATE tbl_comment "
            + "     SET comContent = ? "
            + "       , modDate = NOW()"
            + "   WHERE comNo = ? ";

        await db.pool.query(query,
            [ comment.comContent, comment.comNo ]);

        res.json({ result: "success" });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const { comNo } = req.params;

        const query = 
                "UPDATE tbl_comment "
            + "     SET remDate = NOW()"
            + "   WHERE comNo = ?";

        await db.pool.query(query, [ comNo ]);

        res.json({ result: "success" });
    }

}