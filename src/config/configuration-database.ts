import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

  export const dataBaseModuleOptions : TypeOrmModuleAsyncOptions = {
    useFactory :  (configService : ConfigService) => {

        const dbHost = configService.get<string>('DB_HOST');
        return {

    type : 'sqlite',
    database : dbHost,
    synchronize : false, 
    entities  : [User]
  
        }

    },
    inject : [ConfigService]

  }