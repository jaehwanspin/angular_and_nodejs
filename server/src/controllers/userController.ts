import { Request, Response } from 'express';
import { Database } from "../database";

export class UserController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db = Database.getInstance();
        const { usNo } = req.params;

        const query: string =
                "SELECT * "
            + "    FROM vw_normaluser "
            + "   WHERE usNo = ? ";

        result = await db.pool.query(query, [ usNo ]);

        result = result[0];

        res.json(result);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db = Database.getInstance();
        const user = req.body;

        const query: string = 
                "INSERT INTO tbl_user(usId, usPass, usEmail) "
            + "                values(   ?,      ?,       ?) ";

        await db.pool.query(query,
            [ user.usId, user.usPass, user.usEmail ]);

        res.json({ result: "success" });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const db = Database.getInstance();
        const user = req.body;

        var query: string =
                "UPDATE tbl_user "
            + "     SET usEmail = ? "
            + "       , usName = ? "
            + (user.usPass ? " , usPass = ? " : "")
            + "       , modDate = NOW()"
            + "   WHERE usNo = ? ";

        const param = new Array();
        param.push(user.usEmail);
        param.push(user.usName);
        if (user.usPass) param.push(user.usPass);
        param.push(user.usNo);

        await db.pool.query(query, param);

        res.json({ result: "success" });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const db = Database.getInstance();
        const { usNo } = req.params;
        const query: string = 
                "UPDATE tbl_user "
            + "     SET remDate = NOW()"
            + "   WHERE usNo = ?"

        await db.pool.query(query, [ usNo ]);
    }

    public async getLogin(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db = Database.getInstance();
        const user = req.body;

        const query: string =
                "SELECT * "
            + "    FROM vw_normaluser "
            + "   WHERE usNo = ? ";

        result = await db.pool.query(query, [ user.usNo ]);

        result = result[0];

        res.json(result);
    }

}