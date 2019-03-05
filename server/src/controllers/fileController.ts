import { Request, Response } from 'express';
import fs from "fs";
import dateFormat from "dateformat";
import jsSHA from "jssha";
import { Database } from '../database';
import { FileManager } from "../fileManager";

export class FileController {

    public async get(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { fileName } = req.params;
        const query: string =
                "SELECT fileNo "
            + "       , CONCAT(fileDir, '/', fileName, IF(fileExt IS NULL, '', CONCAT('.', fileExt))) \"path\" "
            + "    FROM vw_normalfile "
            + "   WHERE CONCAT(fileName, IF(fileExt IS NULL, '', CONCAT('.', fileExt))) = ? ";

        result = await db.pool.query(query, [ fileName ]);

        result = result[0];

        if (result) {
            const file = fs.readFileSync(result.path);
            res.send(file);
        }
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        
        const query: string =
                "INSERT INTO tbl_file(fileName, fileDir, fileExt) "
            + "                VALUES(       ?,       ?,       ?) ";

        var ret = null;
        
        if (req.file) {

            const fileExtIdx: number = req.file.filename.lastIndexOf(".") + 1;
            const fileExt: string = req.file.filename
                .substring(fileExtIdx, req.file.filename.length).toLowerCase();
            const fileExceptExt: string = req.file.filename
                .substring(0, fileExtIdx - 1);

            await db.pool.query(query, [ fileExceptExt, req.file.destination, fileExt ])
            ret = {
                fileName: fileExceptExt,
                fileDir: req.file.destination,
                fileExt: fileExt
            }
        }

        res.json(ret);
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const { fileNo } = req.params;
        const query: string =
                "UPDATE tbl_file "
            + "     SET fileAvailable = 0 "
            + "   WHERE fileNo = ? ";

        await db.pool.query(query, [ fileNo ]);

        res.json({result: "success"});
    }
}