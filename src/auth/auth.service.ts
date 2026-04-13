import { UsersService } from './../users/users.service';
import { Token } from 'src/auth/token.entity';
import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { generateUnitValues } from 'src/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

    constructor ( private usersService : UsersService ,  @InjectRepository(Token) private tokenRepository : Repository<Token>  ) { 
     
    }


    async handleAuthRequest(authRequest: AuthRequestDto) : Promise<{ user: AuthUserDto ; token: string}> { {

      const user = await this.usersService.validateTonek(authRequest.token, authRequest.operation) // valide le token de validation en appelant la méthode validateTonek du service UsersService
      const token = new Token() // crée une instance de l'entité Token pour générer un token d'authentification

      token.user = user // associe l'utilisateur validé au token d'authentification
       token.token = generateUnitValues() // génère un token d'authentification aléatoire
      await this.tokenRepository.save(token) // sauvegarde le token d'authentification dans la base de données

      return {
         user : {
            id : user.id,
            name : user.name,
            handle: user.handle,
            email : user.email,
            image : user.image},
            
         token : token.token
      }
         }

    }
}

