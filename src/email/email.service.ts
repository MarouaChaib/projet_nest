import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
         this.transporter = nodemailer.createTransport({
    host: this.configService.get<string>('EMAIL_HOST'),
    port: this.configService.get<number>('EMAIL_PORT'),
    auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD')
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
            <a href="${this.configService.get<string>('CLIENT_HOST')}/users/verify-email?token=${token}">Verify Email</a>
            `
        })
    }
}
