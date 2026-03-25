import { Body, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';



@Injectable()
export class UsersService {

     constructor (@InjectRepository(User) private userRepository : Repository<User>){
            
        }

    async createUser (@Body() userData : CreateUserDto ) : Promise<void>
         {
            const user = new User()
             user.email = userData.email
             user.name = userData.email.split('@')[0]

            await this.userRepository.save(user)
           
            
           
         }
}
