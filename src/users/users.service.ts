import { Body, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';



@Injectable()
export class UsersService {

     constructor (@InjectRepository(User) private userRepository : Repository<User> , private emailService : EmailService ) {
            
        }

    async createUser (@Body() userData : CreateUserDto ) : Promise<void>
         {
            const user = new User()
             user.email = userData.email
             user.name = userData.email.split('@')[0]
             user.handle = user.name
             user.registrationToken = crypto.randomUUID() // génère un token aléatoire pour la validation de l'email
            
            await this.userRepository.save(user)

            await this.emailService.sendSingUpEmail(user.email , user.registrationToken )
            
                      
           
         }
}
