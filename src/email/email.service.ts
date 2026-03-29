import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
         this.transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'levi.hahn2@ethereal.email',
        pass: 'hUpgDtVR6P16YYUQ5p'
    }
});
    }
    async sendSingUpEmail(email: string, token: string) {
        await this.transporter.sendMail({
            from : "blog wissam" , 
            to : email,
            subject : "welcome to our blog",
            html : `<h1>welcome to our blog</h1>
            <p>please click on the following link to verify your email</p>
            <a href="http://localhost:3000/users/verify-email?token=${token}">Verify Email</a>
            `
        })
    }
}
