import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";

export default new DataSource({
    type : 'sqlite',
    database : './app-db.sqlite',
    synchronize : false, 
    logging : true,
    entities  : [User],
    migrations: ['src/database/migrations/*.ts'],
})