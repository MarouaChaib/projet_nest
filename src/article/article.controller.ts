import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/articleRequestDto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async createArticle( @Body() ArticleRequestDto : ArticleRequestDto) {
    return this.articleService.save(ArticleRequestDto);

  }
}
