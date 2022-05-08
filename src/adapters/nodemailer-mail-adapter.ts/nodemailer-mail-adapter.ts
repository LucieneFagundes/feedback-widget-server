import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "18874693a736dc",
        pass: "c3bd5ea972eb68"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        
    await transport.sendMail({
        from: 'Euipe Rocket <oi@equiperocket.com>',
        to: 'Luciene Fagundes <luhfagundes99@hotmail.com>',
        subject: subject,
        html: body
    });
    }

}