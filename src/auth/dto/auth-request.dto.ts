import { IsEnum, IsNotEmpty } from "class-validator";
import { Operation } from "src/shared";

export class AuthRequestDto {
    @IsNotEmpty() // Validation pour s'assurer que le champ n'est pas vide
    token!: string;
    @IsEnum(Operation , {message: "Invalid operation"}) // Validation pour s'assurer que la valeur est l'une des valeurs définies dans l'énumération Operation
    operation!: Operation;

    
}