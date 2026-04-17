import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
//garanti que le service de messagerie est facilement testable et que les détails de configuration peuvent être gérés de manière centralisée via le ConfigService.(logique métier liée à l'envoi d'emails)
@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor(private configService: ConfigService) { //configService pour accéder aux variables d'environnement liées à la configuration de l'email
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
        console.log(token , "token");
        
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
     async loginEmail(email: string, token: string) { 
        console.log(token , "token");
        
        await this.transporter.sendMail({
            from : "blog wissam" , 
            to : email,
            subject : "confirm your login",
            html : `<h1>confirm your login</h1>
            <p>please click on the following link to login</p>
            <a href="${this.configService.get<string>('CLIENT_HOST')}/users/verify-email?token=${token}">signe in</a> 
            `
        })
    }
}
