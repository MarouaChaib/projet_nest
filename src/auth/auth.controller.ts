import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';

import type { Request, Response } from 'express';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async handleAuthRequest(@Body() authRequest: AuthRequestDto  , @Res({passthrough : true}) res : Response) {
    
    const result = await this.authService.handleAuthRequest(
      authRequest
    );
    res.cookie('auth_token', result.token, { httpOnly: true , expires : new Date(Date.now() + 24 * 60 * 60 * 1000) }) // Définit un cookie d'authentification avec les options de sécurité appropriées (httpOnly, secure, sameSite) pour protéger le token d'authentification contre les attaques de type cross-site scripting (XSS) et les attaques de type cross-site request forgery (CSRF).
    return result.user; // retourne les informations de l'utilisateur authentifié dans la réponse de l'API. Le token d'authentification est stocké dans un cookie pour être utilisé dans les requêtes ultérieures.
  }
  @Post('logout')
  async logout(@Req() req : Request , @Res({passthrough : true}) res : Response) {
    const token = req.cookies?.['auth_token'] // récupère le token d'authentification depuis les cookies de la requête

    await this.authService.logout(token) // appelle la méthode logout du service AuthService pour invalider le token d'authentification
    res.clearCookie('auth_token') // supprime le cookie d'authentification du client pour terminer la session de l'utilisateur  

    return { message : 'Logged out successfully' }
  }
  @Post('login')
  async login(
    @Body()   email: loginDto 
   
  ) {
    const result = await this.authService.login(email);
  
    return result;
  }
}
