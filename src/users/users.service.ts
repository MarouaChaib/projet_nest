import { Body, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { generateUnitValues } from 'src/shared';
//service garanti la logique métier
@Injectable()
export class UsersService {
   constructor (@InjectRepository(User) private userRepository : Repository<User> , private emailService : EmailService ) { }
   async createUser (@Body() userData : CreateUserDto ) : Promise<void>{
      const user = new User()
      user.email = userData.email
      user.name = userData.email.split('@')[0]
      user.handle = user.name 
      const handleInDb = await this.userRepository.findOneBy({handle : user.handle}) // vérifie si le handle existe déjà dans la base de données
         if(handleInDb){
            user.handle = user.name+generateUnitValues(true) // génère une valeur unique pour le handle si celui-ci existe déjà
         }
      user.registrationToken = generateUnitValues() // génère un token aléatoire pour la validation de l'email
      try{ 
         await this.userRepository.save(user)
         await this.emailService.sendSingUpEmail(user.email , user.registrationToken ) //sendSingUpEmail est une méthode du service EmailService qui envoie un email de confirmation d'inscription à l'utilisateur avec le token de validation.
      }catch(error){
         console.error('Error creating user:', error);
         throw new Error('Failed to create user');
      }
   }
}
