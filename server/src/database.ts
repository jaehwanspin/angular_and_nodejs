import mysql from "promise-mysql";
import fs from "fs";

export class Database {

    public pool: mysql.Pool;

    private static instance: Database;
    public static getInstance(): Database {
        if (!Database.instance) Database.instance = new Database();
        return Database.instance;
    }

    private constructor() {
        this.pool = mysql.createPool(JSON.parse(fs.readFileSync("./dbconfig.json").toString()));

        this.pool.getConnection()
            .then(connection => {
                this.pool.releaseConnection(connection);
            });
    }


}