import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import type { Request, Response } from 'express';
import { LoginDto } from './dto/loggin.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async handleAuthRequest(@Body() authRequest: AuthRequestDto , @Res({passthrough: true}) res : Response) {
    const result = await this.authService.handleAuthRequest(authRequest);
    res.cookie('auth_token', result.token, { httpOnly: true, expires : new Date(Date.now() + 24 * 60 * 60 * 1000) }) // stocke le token d'authentification dans un cookie sécurisé pour une utilisation ultérieure dans les requêtes authentifiées
    return result.user; // retourne les informations de l'utilisateur authentifié en réponse à la requête d'authentification. 
  }
  @Post("logout")
  async logout(@Req() req : Request , @Res({passthrough: true}) res : Response){
  const token = req.cookies?.['auth_token'] // récupère le token d'authentification depuis les cookies de la requête
  await this.authService.logout(token) // appelle la méthode logout du service d'authentification pour invalider le token
  res.clearCookie('auth_token') // supprime le cookie d'authentification du client pour s'assurer que le token n'est plus utilisé pour les requêtes futures
  return {message : "logged out successfully"}
 }
@Post('login')
  async login(@Body()  email: LoginDto ) {
   const result = await this.authService.login(email);
   return result;
}
}


// on généarl on utilise la classe sert à créer des objets réels , ensuite on peut l'instancier pour créer des objets spécifiques  on l'utilise dans controller service dto entity
//interface : c'est un contrat qui définit la structure d'un objet, càd juste typer on peut l'implimnter dans une classe pour quelle respecte cette structure 
// type presque comme l'interface mais il est plus puissant car on faire union combinaison 