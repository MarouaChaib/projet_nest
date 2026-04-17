import { MaxLength, MinLength } from "class-validator";

export class ArticleRequestDto {
    @MinLength(3)
    @MaxLength(100)
    title! : string;
    @MinLength(10)
    @MaxLength(500)
    content! : string;
    image! : string;
}

