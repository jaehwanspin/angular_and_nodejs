import multer from "multer";

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
            destination: (req, file, cb) => {
                cb(null, "assets/");
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        this.uploads = multer({ storage: this.storage });
    }
}