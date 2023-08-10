import nodemailer from 'nodemailer'
import config from "../config.js";

export default class MailingService{
    constructor(){
        this.mailer = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:config.app.emailApp,
                pass:config.app.passwordApp
            }
        })
    }

    sendMail = async(emails,template,payload) => {
        const mailInfo = DMailInfo[template];
        const html = await generateMailTemplate(template,payload);
        const result = await this.mailer.sendMail({
            from: 'Trini <mtgprimaria@gmail.com>',
            to: emails,
            html,
            ...mailInfo
        })
        return result;
    }
}