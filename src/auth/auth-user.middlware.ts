import { AuthService } from './auth.service';
import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class AuthUserMiddleware implements NestMiddleware{
    constructor (private AuthService: AuthService){}
   async use(req: Request, res: Response, next: (error?: any) => void) {
        const auth_token = req.cookies?.['auth_token'] // récupère le token d'authentification depuis les cookies de la requête
        if(!auth_token){
           return next() // si le token d'authentification n'est pas présent dans les cookies, la fonction next() est appelée pour passer au middleware suivant ou au gestionnaire de route sans effectuer d'authentification.
    }
    const user = await this.AuthService.ValidateUser(auth_token)
    req['user'] = user
    next()
}}