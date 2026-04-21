import { Article } from "src/article/article.entity";
import { Token } from "src/auth/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//la structure de la table user dans la BDD
@Entity({name : 'user'}) //entity représente une table dans la base de données, le nom de la table est spécifié comme 'user'.
export class User {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id! : number ;
    @Column()
    name! : string ;
    @Column()
    email! : string ;
    @Column()
    handle! : string ;
    @Column({nullable: true})
    image! : string ;
    @Column({nullable: true})
    registrationToken! : string ;
    @Column({nullable: true})
    loginToken! : string ;
    @OneToMany(() => Token, token => token.user)
    tokens! : Token[]
    @OneToMany(() => Article, article => article.user)
    articles! : Article[]

}