import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';

const envfilePath = process.env.NODE_ENV === 'development' ? '.dev.env' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envfilePath) });
export default new DataSource({
    type : 'sqlite',
    database : process.env.DB_HOST ?? './app-db-dev.sqlite',
    synchronize : false, 
    logging : true,
    migrations: ['src/database/migrations/*.ts'],
})