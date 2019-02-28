import { Request, Response } from 'express';
import fs from "fs";
import { Database } from '../database';

export class FileController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db = Database.getInstance();
        const { fileName } = req.params;
        const query: string =
                "SELECT fileNo "
            + "       , CONCAT(fileDir, '/', fileName, IF(fileExt IS NULL, '', CONCAT('.', fileExt))) \"path\" "
            + "    FROM tbl_file "
            + "   WHERE CONCAT(fileName, IF(fileExt IS NULL, '', CONCAT('.', fileExt))) = ? ";

        result = await db.pool.query(query, [ fileName ]);

        result = result[0];

        if (result) {
            const file = fs.readFileSync(result.path);
            res.send(file);
        }
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db = Database.getInstance();
        const file = req.body;

        console.log(JSON.stringify(file));
        const re = fs.readFileSync(file);
        
        console.log(re);

        const query: string = 
                "";

        
        
        res.json({result: "success"});
    }

}