import { UsersService } from './users.service';
import { BadRequestException, Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { generecResponse } from 'src/shared';
import { GenericExceptionFilter } from 'src/shared/exceptions/exception-filter';

//controller garanti la logique routing 
@Controller('users')
export class UsersController {
   constructor (private usersService: UsersService){ }
   @Post() 
   @UsePipes(new ValidationPipe({
      exceptionFactory: (errors) => {
       return new BadRequestException(errors);
      }
   })) // UsePipes pour valider les données entrantes avec les DTOs
   @UseFilters(GenericExceptionFilter) // UseFilters pour gérer les exceptions de manière centralisée
   async createUser (@Body() userData : CreateUserDto ) // CreateUserDto est un objet qui contient les données nécessaires pour créer un utilisateur
   : Promise<generecResponse>
   {
      await this.usersService.createUser(userData)
      return new generecResponse('veuillez verifier votre email pour verifier votre compte')
   }
}

