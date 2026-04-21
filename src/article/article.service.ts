import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleRequestDto } from './dto/articleRequestDto';
import { generateUnitValues } from 'src/shared';
import { User } from 'src/users/user.entity';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {}
    async save(value:ArticleRequestDto, currentUser: User) {
        const article = new Article();
        article.title = value.title;
        article.content = value.content;
        article.image = value.image;
        article.slug = encodeURIComponent(value.title.toLowerCase().replaceAll(' ', '-'))+ '-'+generateUnitValues(true)
       // article.authorId = value.authorId ;
       article.user = currentUser;
       await this.articleRepository.save(article);
       return{id : article.id}
}

}