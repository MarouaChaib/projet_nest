import { MaxLength, MinLength } from "class-validator";

export class ArticleRequestDto {
    @MinLength(3)
    @MaxLength(100)
    title!: string;
    slug!: string;
    content!: string;
    image?: string;
    autherId!: number;      
}