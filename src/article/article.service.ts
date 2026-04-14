import { ArticleRequestDto } from './dto/article-request.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { generateUnitValues } from 'src/shared';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {}

    async save(value : ArticleRequestDto) {
        const article = new Article();
        article.title = value.title;
        article.content = value.content;
        article.slug = encodeURIComponent( value.title.toLowerCase().replaceAll(' ', '-'))+'-'+ generateUnitValues(true); // Générer un slug à partir du titre;

        
        article.autherId = value.autherId;
         await this.articleRepository.save(article);
        
        return {id:article.id}
    }
}
