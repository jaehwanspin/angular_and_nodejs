import { Request, Response } from 'express';

import { Database } from "../database";
import { EmailManager } from '../emailManager';

export class UserController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
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
        const db: Database = Database.getInstance();
        const user = req.body;

        const query: string = 
                "INSERT INTO tbl_user(usId, usPass, usEmail) "
            + "                VALUES(   ?,      ?,       ?) ";

        await db.pool.query(query,
            [ user.usId, user.usPass, user.usEmail ]);

        res.json({ result: "success" });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
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
        const db: Database = Database.getInstance();
        const { usNo } = req.params;
        const query: string = 
                "UPDATE tbl_user "
            + "     SET remDate = NOW()"
            + "   WHERE usNo = ?"

        await db.pool.query(query, [ usNo ]);
    }

    public async getLogin(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const user = req.body;

        const query: string =
                "SELECT * "
            + "    FROM tbl_user "
            + "   WHERE usId = ? "
            + "     AND usPass = ? "
            + "     AND remDate IS NULL";

        result = await db.pool.query(query, [ user.usId, user.usPass ]);

        if (result[0])
            result = { login: true };
        else
            result = { login: false };

        res.json(result);
    }

    public async getUsIdValidated(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { usId } = req.body;

        const query: string = 
                "SELECT usId "
            + "    FROM tbl_user "
            + "   WHERE usId = ? ";

        result = await db.pool.query(query, [ usId ]);

        if (result && result[0])
            res.json({ result: false });
        else
            res.json({ result: true });
    }

    public async getUsEmailValidated(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { usEmail } = req.body;

        const query: string = 
                "SELECT usId "
            + "    FROM tbl_user "
            + "   WHERE usEmail = ? ";

        result = await db.pool.query(query, [ usEmail ]);

        if (result && result[0])
            res.json({ result: false });
        else
            res.json({ result: true });
    }

    public async genEmailCode(req: Request, res: Response): Promise<any> {
        var genedCode = 0;

        var gen = () => {
            var code = Math.floor(Math.random() * 1000000);
            if (code < 1000000 && code >= 100000) genedCode = code;
            else gen();
        }
        gen();
        
        const { usEmail } = req.body;

        const em: EmailManager = EmailManager.getInstance();
        em.sendMail({
            to: usEmail,
            subject: "회원가입 이메일 인증코드",
            text: `인증 코드는 ${genedCode} 입니다`
        });
        
        res.json({ code: genedCode });
    }
}