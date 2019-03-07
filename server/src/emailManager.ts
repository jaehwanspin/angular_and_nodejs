import { createTransport } from "nodemailer";
import * as nodemailer from "nodemailer";
import fs from "fs";
import { stringify } from "querystring";

export class EmailManager {

    private static instance: EmailManager;
    public static getInstance(): EmailManager {
        if (!EmailManager.instance)
            EmailManager.instance = new EmailManager();
        return EmailManager.instance;
    }

    public transporter: any;
    public config: any;

    constructor() {
        this.config = this.getConfig();
        this.transporter = createTransport(this.getConfig());
    }

    private getConfig(): any {
        // ./server/mailauthconfig.json
        // 
        // {
        //     "service": "gmail",
        //     "auth": {
        //         "user": "youraccount@gmail.com",
        //         "pass": "yourpassword"
        //     }
        // }
        return JSON.parse(fs.readFileSync("./mailauthconfig.json").toString());
    }

    public sendMail(opt: {from?: string, to: string, subject: string, text: string}): string {

        if (!opt.from) opt.from = this.config.auth.user; 

        this.transporter.sendMail(opt, (error: any, info: any) => {
            if (error) {
                console.log(error);
                return JSON.stringify(error);
            }
            else {
                console.log("Email sent: " + info.response);
                return JSON.stringify(info.response);
            }
        });

        return "아아아";
    }
}