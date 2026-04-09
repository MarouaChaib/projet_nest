import { IsEnum, IsNotEmpty } from 'class-validator';
import { Operation } from './../../shared/types/index';
export class AuthRequestDto {
    @IsNotEmpty()// Le décorateur @IsNotEmpty() de class-validator est utilisé pour valider que la propriété token n'est pas vide. Cela signifie que lors de la validation d'une instance de AuthRequestDto, si le champ token est vide ou non défini, une erreur de validation sera générée.
    token!: string;
    @IsEnum(Operation, { message: "invalid operation" }) // Le décorateur @isEnum() de class-validator est utilisé pour valider que la propriété operation est une valeur valide de l'énumération Operation. Cela signifie que lors de la validation d'une instance de AuthRequestDto, si le champ operation ne correspond pas à l'une des valeurs définies dans l'énumération Operation (LOGIN ou REGISTER), une erreur de validation sera générée avec un message indiquant les valeurs valides.
    operation!: Operation;
}