import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthUserMiddleware implements NestMiddleware {
    constructor (private  authService : AuthService) {}
    async use(req: Request, res: Response, next: (error?: any) => void) {
       const authToken = req.cookies?.['auth_token'] // récupère le token d'authentification depuis les cookies de la requête
       if(!authToken) {
        return next() // si le token d'authentification n'est pas présent dans les cookies, la fonction middleware appelle la fonction next() pour passer à la prochaine étape du traitement de la requête sans effectuer d'authentification.
       }
       const user = await this.authService.validateUser(authToken); // utilise le service d'authentification pour valider l'utilisateur avec le token d'authentification
       req['user'] = user; // si l'utilisateur est validé avec succès, la fonction middleware ajoute les informations de l'utilisateur à l'objet de requête (req) pour une utilisation ultérieure dans les étapes suivantes du traitement de la requête.
       next() // enfin, la fonction middleware appelle la fonction next() pour passer à la prochaine étape du traitement de la requête, que l'authentification ait réussi ou non.
    }
    
}
    
    

