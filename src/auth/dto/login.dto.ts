import { IsEmail } from "class-validator";


export class loginDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
  
    email!: string; 
}
// dto data transfer object
//dto sert à définir la structure des données attendues lors de la création d'un utilisateur, dans ce cas, il attend une adresse e-mail sous forme de chaîne de caractères.