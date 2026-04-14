import { UsersService } from './../users/users.service';

import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { generateUnitValues, Operation } from 'src/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';


@Injectable()
export class AuthService {

    constructor ( private usersService : UsersService ,  @InjectRepository(Token) private tokenRepository : Repository<Token>  ) { 
     
    }


    async handleAuthRequest(authRequest: AuthRequestDto) : Promise<{ user: AuthUserDto ; token: string}> { 

      const user = await this.usersService.validateToken(authRequest.token, authRequest.operation) // valide le token de validation en appelant la méthode validateTonek du service UsersService
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

    

    async logout(token : string) {
      await this.tokenRepository.delete({token}) // supprime le token d'authentification de la base de données pour invalider la session de l'utilisateur
    }

    
    async generateLoginToken(email: string) {
  const user=await this.userRepository.findOneBy({ email });
  if (!user) {
    throw new BadRequestException("email non valide")
  }
  user.loginToken=generateUnicValues()
    const queryRunner=this.dataSource.createQueryRunner();
    try {
     // await this.userRepository.save(user);
      await queryRunner.startTransaction()
      await queryRunner.manager.save(user)

      await this.EmailService.loginEmail(
        user.email,
        user.loginToken,
      );
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      console.error('Error login user:', error);
      throw new Error('Failed to login user');
    }
}
  async validateToken(token:string,operation:Operation){
  const userWhere:FindOptionsWhere<User>={}
  if (operation === Operationperation.REGISTER) {
   userWhere.registritionToken=token//On cherche utilisateur avec ce token

} else if (operation === Operation.LOGIN) {
    userWhere.loginToken = token;
  }

const user=await this.userRepository.findOneBy(userWhere)
if (!user) {
  throw new Error('invalid token')

}
 if (operation === Operation.REGISTER) {
    user.registritionToken = '';
  }

  //si LOGIN → on supprime token de login 
  else if (operation === Operation.LOGIN) {
    user.loginToken = '';
  }
   await this.userRepository.save(user) // sauvegarde les modifications de l'utilisateur dans la base de données

      return user;


    
}
}

    

    

}

