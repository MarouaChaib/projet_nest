import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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