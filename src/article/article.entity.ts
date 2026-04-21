import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({name : 'article'})
export class Article {
    @PrimaryGeneratedColumn()
    id! : number ;
    @Column()
    title! : string;
    @Column()
    slug! : string;
    @Column({length: 500})
    content! : string;
    @Column({nullable: true})
    image! : string;
    //authorId! : number;
    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt! : Date;
    @UpdateDateColumn({default: () => 'CURRENT_TIMESTAMP' , onUpdate: 'CURRENT_TIMESTAMP'}) 
    updatedAt! : Date;
    @ManyToOne(() => User, user => user.articles)
    user!:User
}