import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Token } from "src/auth/token.entity";
import { Article } from "src/article/article.entity";
import { Token } from "src/auth/token.entity";
import { Article } from "src/article/article.entity";
//configurer dotenv pour charger les variables d'environnement à partir du fichier .env
const envfilePath = process.env.NODE_ENV === 'development' ? '.dev.env' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envfilePath) });
export default new DataSource({
    type : 'sqlite',
    database : process.env.DB_HOST ?? './app-db-dev.sqlite', 
    synchronize : false, 
    entities : [User, Token , Article], //entities représente les entités de la base de données, ici on inclut l'entité User et tous les fichiers d'entités dans le dossier entities
    entities : [User, Token , Article],
    logging : true,
    migrations: ['src/database/migrations/*.ts'],
})