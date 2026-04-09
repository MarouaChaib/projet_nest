import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { User } from "../user.entity";
import { Repository } from "typeorm";

export class UniqueEmailValidator implements ValidatorConstraintInterface{
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}
    async validate(value: string): Promise<boolean> {
        const email = await this.userRepository.findOneBy({email : value})
        return !email
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Method not implemented.");
    }
    
}
