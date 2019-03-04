import multer from "multer";
import fs from "fs";
import dateFormat from "dateformat";
import jsSHA from "jssha";

export class FileManager {

    private static instance: FileManager;
    public static getInstance(): FileManager {
        if (!FileManager.instance)
            FileManager.instance = new FileManager();
        return FileManager.instance;
    }

    public uploads: multer.Instance;
    private storage: multer.StorageEngine;

    private constructor() {
        this.storage = multer.diskStorage({
            destination: this.destConfig,
            filename: this.fileNameConfig
        });

        this.uploads = multer({ storage: this.storage });
    }

    private destConfig(req: Express.Request, file: Express.Multer.File, callback: Function): void {
        var today: string = dateFormat(new Date(), "yyyymmdd");
        var subDir = "etc";
        
        const fileExtIdx: number = file.originalname.lastIndexOf(".") + 1;
        const fileExt: string = file.originalname
            .substring(fileExtIdx, file.originalname.length).toLowerCase();

        if (fileExt === "jpg" || fileExt === "png" || fileExt === "gif" ||
            fileExt === "jpeg" || fileExt === "tif" || fileExt === "bmp") {    
            subDir = "images";
        }


        if (!fs.existsSync("assets/" + subDir + "/" + today)) {
            fs.mkdirSync("assets/" + subDir + "/" + today);
        }

        callback(null, "assets/" + subDir + "/" + today + "/");
    }

    private fileNameConfig(req: Express.Request, file: Express.Multer.File, callback: Function): void {
        var today: string = dateFormat(new Date(), "yyyymmdd");
        const time: string = dateFormat(new Date(), "yyyymmdd HH:MM:ss l");
        var sha = new jsSHA("SHA-256", "TEXT");
    
        sha.update(file.originalname + today + file.size + time);

        const fileExtIdx: number = file.originalname.lastIndexOf(".") + 1;
        var fileExt: string = "." + file.originalname
            .substring(fileExtIdx, file.originalname.length).toLowerCase();

        if (fileExtIdx === 0) fileExt = "";
        
        callback(null, sha.getHash("HEX") + fileExt);
    }
}