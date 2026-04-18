
import { FindOptionsWhere, QueryRunner } from 'typeorm';
import { DataSource } from 'typeorm';
import { BadRequestException, Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { generateUnitValues, Operation } from 'src/shared';
import { User } from './user.entity';
//service garanti la logique métier
@Injectable()
export class UsersService {
  [x: string]: any;
   constructor (@InjectRepository(User) private userRepository : Repository<User> , private emailService : EmailService , private dataSource : DataSource) { }
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
      const queryRunner = this.dataSource.createQueryRunner(); // crée un query runner pour gérer la transaction
      try{ 
         //await this.userRepository.save(user)
         await queryRunner.startTransaction() // démarre la transaction
         await queryRunner.manager.save(user) // sauvegarde l'utilisateur dans la base de données locale
         await this.emailService.sendSingUpEmail(user.email , user.registrationToken ) //sendSingUpEmail est une méthode du service EmailService qui envoie un email de confirmation d'inscription à l'utilisateur avec le token de validation.
         await queryRunner.commitTransaction() // valide la transaction si tout s'est bien passé
      }catch(error){
         await queryRunner.rollbackTransaction() // annule la transaction en cas d'erreur
         console.error('Error creating user:', error);
         throw new Error('Failed to create user');
      }
   }
    async generateLoginToken(email: string){
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    //  générer token de login
    user.loginToken = generateUnitValues();
    const queryRunner = this.dataSource.createQueryRunner(); // crée un query runner pour gérer la transaction
      try{ 
         //await this.userRepository.save(user)
         await queryRunner.startTransaction() // démarre la transaction
         await queryRunner.manager.save(user) // sauvegarde l'utilisateur dans la base de données locale
         await this.emailService.loginEmail(user.email , user.loginToken ) //loginEmail est une méthode du service EmailService qui envoie un email de confirmation de connexion à l'utilisateur avec le token de login.
         await queryRunner.commitTransaction() // valide la transaction si tout s'est bien passé
      }catch(error){
         await queryRunner.rollbackTransaction() // annule la transaction en cas d'erreur
         console.error('Error creating user:', error);
         throw new Error('Failed to create user');
      }
   }
   
    async validateToken(token:string,operation:Operation){
      const userWhere:FindOptionsWhere<User>={}
    if (operation === Operation.REGISTER) {
      userWhere.registrationToken=token//On cherche utilisateur avec ce token
    } else if (operation === Operation.LOGIN) {
    userWhere.loginToken = token;
    }  
      const user=await this.userRepository.findOneBy(userWhere)
      if (!user) {
      throw new Error('invalid token')
      }  
      if (operation === Operation.REGISTER) {
      user.registrationToken = '';
      }

         //  si LOGIN → on supprime token de login (optionnel)
      else if (operation === Operation.LOGIN) {
      user.loginToken = '';
      }
      await this.userRepository.save(user) // sauvegarde les modifications de l'utilisateur dans la base de données
      return user;
   }
}
