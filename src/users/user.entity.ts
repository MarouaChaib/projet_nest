import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//la structure de la table user dans la BDD
@Entity({name : 'user'}) //entity représente une table dans la base de données, le nom de la table est spécifié comme 'user'.
export class User {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string ;
    @Column()
    email : string ;
    @Column()
    handle : string ;
    @Column({nullable: true})
    image : string ;
    @Column({nullable: true})
    registrationToken : string ;
    @Column({nullable: true})
    loginToken : string ;

}