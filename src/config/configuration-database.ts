import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

export const dataBaseModuleOptions : TypeOrmModuleAsyncOptions = {
  useFactory :  (configService : ConfigService) => { //use factory pour 
    const dbHost = configService.get<string>('DB_HOST');
    console.log("DATABASE USED:", dbHost);
    return {
      type : 'sqlite',
      database : dbHost,
      synchronize : false, 
      entities : [User]
    }
  },
  inject : [ConfigService]
}