import { IsEmail, Validate } from "class-validator";
import { UniqueEmailValidator } from "../validater/uniqueEmailValidater";

export class CreateUserDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    @Validate(UniqueEmailValidator)
    email!: string; 
}
// dto data transfer object
//dto sert à définir la structure des données attendues lors de la création d'un utilisateur, dans ce cas, il attend une adresse e-mail sous forme de chaîne de caractères.