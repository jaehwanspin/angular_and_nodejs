import { Request, Response } from 'express';

import { Database } from "../database";

export class BoardController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { catNo, boNo } = req.params;

        const queryGet =
                "SELECT * "
            + "    FROM vw_normalboard "
            + "   WHERE catNo = ? "
            + "     AND boNo = ?";

        const queryCnt = 
                "UPDATE tbl_board "
            + "     SET readCount = readCount + 1 "
            + "   WHERE boNo = ? ";

        result = await db.pool.query(queryGet, [ catNo, boNo ]);

        if (result[0]) {
            result = result[0];
            await db.pool.query(queryCnt, [ boNo ]);
        } else {
            result = "failed";
        }

        res.json(result);
    }

    public async getList(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { catNo } = req.params;
        const { searchOpt, keyword, curPage, perPage } = req.query;

        const searchKeyword = "%" + keyword + "%";

        const query = 
                "SELECT * "
            + "    FROM vw_normalboard"
            + "   WHERE TRUE "
            + (searchOpt === "t" ? " AND boTitle LIKE ? " : 
                searchOpt === "c" ? " AND boContent LIKE ? " :
                searchOpt === "u" ? " AND (usId LIKE ? OR usName LIKE ?) " :
                "")
            + "     AND catNo = ? "
            + "   LIMIT ?, ? ";
        
        const params = new Array();
        if (searchOpt === "u") {
            params.push(searchKeyword);
            params.push(searchKeyword);
        } else {
            params.push(searchKeyword);
        }
        params.push(catNo);
        params.push(parseInt(curPage));
        params.push(parseInt(perPage));
        result = await db.pool.query(query, params);
        
        res.json(result);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const board = req.body;

        const query = 
                "INSERT INTO tbl_board(catNo, boTitle, boContent, writer) "
            + "                 VALUES(    ?,       ?,         ?,      ?) ";

        await db.pool.query(query,
            [ board.catNo, board.boTitle, board.boContent, board.writer ]);

        res.json({ result: "success" });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const board = req.body;

        const query = 
                "UPDATE tbl_board "
            + "     SET boTitle = ? "
            + "       , boContent = ? "
            + "       , modDate = NOW()"
            + "   WHERE boNo = ? ";

        await db.pool.query(query,
            [ board.boTitle, board.boContent, board.boNo ]);

        res.json({ result: "success" });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const { boNo } = req.params;

        const query = 
                "UPDATE tbl_board "
            + "     SET remDate = NOW()"
            + "   WHERE boNo = ?";

        await db.pool.query(query, [ boNo ]);

        res.json({ result: "success" });
    }

}