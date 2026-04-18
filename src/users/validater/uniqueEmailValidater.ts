import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../user.entity";
import { Repository } from "typeorm";
@ValidatorConstraint({ name: 'UniqueEmailValidator', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface{ 
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}
    async validate(value: string): Promise<boolean> {
        const email = await this.userRepository.findOneBy({email : value})
        return !email //car si email existe alors return false sinon true
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'email $value already exists. Please choose another email.';
    }
    
}
