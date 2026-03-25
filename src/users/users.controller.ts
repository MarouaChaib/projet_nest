import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { generecResponse } from 'src/shared';

@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService){
        
    }

    @Post() 
     async createUser (@Body() userData : CreateUserDto )
     : Promise<generecResponse>
     {
        await this.usersService.createUser(userData)
        


        return new generecResponse('veuillez verifier votre email pour verifier votre compte')
     }

    


}

