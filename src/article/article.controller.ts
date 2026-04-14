import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/article-request.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() articleRequestDto: ArticleRequestDto) {
    
   
  }

}
