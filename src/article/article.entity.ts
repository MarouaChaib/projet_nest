import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn ,  } from "typeorm";

@Entity()
export class Article {
     @PrimaryGeneratedColumn()
        id!: number;
        @Column()
        title!: string;
        @Column()
        slug!: string;
        @Column({length: 5000})
        content!: string;
        @Column({ nullable: true })
        image!: string;
        @Column()
        autherId!: number;
        @CreateDateColumn({default : () => 'CURRENT_TIMESTAMP'})
        created_at!: Date;
        @UpdateDateColumn({default : () => 'CURRENT_TIMESTAMP'})
        updated_at!: Date;  

       
}