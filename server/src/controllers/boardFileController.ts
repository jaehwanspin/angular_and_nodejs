import { Request, Response } from 'express';
import http from "http";
import { XMLHttpRequest } from "xmlhttprequest-ts";
import { Database } from "../database";

import { FileRoutes } from "../routes/fileRoutes";

export class BoardFileController {

    public async getList(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const db: Database = Database.getInstance();
        const { boNo } = req.params;
        const query = 
                "SELECT * "
            + "    FROM vw_normalboardfile "
            + "   WHERE boNo = ? ";

        result = await db.pool.query(query, [ boNo ]);

        res.json(result);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const db: Database = Database.getInstance();
        const { boNo } = req.params;
        var ret = null;
        
        const selectQuery =
                "SELECT fileNo "
            + "    FROM vw_normalfile "
            + "   WHERE fileName = ? "
            + "     AND fileDir = ? "
            + "     AND fileExt = ? ";

        const boardFileQuery = 
                "INSERT INTO tbl_boardfile(boNo, fileNo) "
            + "                     VALUES(   ?,      ?) ";
        
        const fileQuery: string =
                "INSERT INTO tbl_file(fileName, fileDir, fileExt) "
            + "                VALUES(       ?,       ?,       ?) ";

        if (req.file) {
            const fileExtIdx: number = req.file.filename.lastIndexOf(".") + 1;
            const fileExt: string = req.file.filename
                .substring(fileExtIdx, req.file.filename.length).toLowerCase();
            const fileExceptExt: string = req.file.filename
                .substring(0, fileExtIdx - 1);

            await db.pool.query(fileQuery, [ fileExceptExt, req.file.destination, fileExt ])
            ret = {
                fileName: fileExceptExt,
                fileDir: req.file.destination,
                fileExt: fileExt
            }
            const fileNo = (await db.pool.query(selectQuery, [
                ret.fileName, ret.fileDir, ret.fileExt
            ]))[0].fileNo;

            await db.pool.query(boardFileQuery, [ boNo, fileNo ]);

            res.json({ result: "success" });
        } else {
            res.json({ result: "failed" });
        }
    }
}