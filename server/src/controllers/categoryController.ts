import { Request, Response } from 'express';

import { Database } from "../database";

export class CategoryController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { catNo } = req.params;

        const query: string =
                "SELECT * "
            + "    FROM vw_normalcategory "
            + "   WHERE catNo = ? ";

        result = await db.pool.query(query, [ catNo ]);

        res.json(result[0]);
    }

    public async getList(req: Request, res: Response): Promise<any> {
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers",
        //     "Origin, X-Requested-With, Content-Type, Accept");
        var result: any = null;
        const db: Database = Database.getInstance();

        const query: string =
                "SELECT * "
            + "    FROM vw_normalcategory ";

        result = await db.pool.query(query);

        res.json(result);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const category = req.body;

        const query: string = 
                "INSERT INTO tbl_category(catName) "
            + "                    VALUES(      ?) ";

        await db.pool.query(query, [ category.catName ]);

        res.json({ result: "success" });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const category = req.body;

        var query: string =
                "UPDATE tbl_category "
            + "     SET catName = ? "
            + "   WHERE catNo = ? ";

        await db.pool.query(query,
            [ category.catName, category.catNo ]);

        res.json({ result: "success" });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const { catNo } = req.params;
        const query: string = 
                "UPDATE tbl_category "
            + "     SET catAvailable = 0"
            + "   WHERE catNo = ?";

        await db.pool.query(query, [ catNo ]);
    }

}