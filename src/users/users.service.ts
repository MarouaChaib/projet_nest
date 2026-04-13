import { User } from 'src/users/user.entity';
import { Operation } from 'src/shared';
import { FindOptionsWhere, QueryRunner } from 'typeorm';
import { DataSource } from 'typeorm';
import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { generateUnitValues } from 'src/shared';
//service garanti la logique métier
@Injectable()
export class UsersService {
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

   async validateTonek (token : string , operation : Operation)  {
      const userWhere : FindOptionsWhere<User> = {};
      if ( operation === Operation.REGISTER) {
         userWhere.registrationToken = token
      }
   const user = await this.userRepository.findOneBy(userWhere) // vérifie si le token de validation correspond à un utilisateur dans la base de données

      if (!user) {
         throw new Error('Invalid token') // lance une erreur si le token est invalide
      }

      user.registrationToken = ''// met à null le token de validation pour indiquer que l'email a été validé

      await this.userRepository.save(user) // sauvegarde les modifications de l'utilisateur dans la base de données

      return user;


   }
   
}
