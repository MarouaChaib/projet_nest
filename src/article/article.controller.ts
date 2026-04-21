import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/articleRequestDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { User } from 'src/users/user.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @UseGuards(AuthGuard) // protège la route en vérifiant que l'utilisateur est authentifié avant d'autoriser l'accès à la création d'article.
  async createArticle( @Body() ArticleRequestDto : ArticleRequestDto , @CurrentUser() currentUser : User) {
    return this.articleService.save(ArticleRequestDto , currentUser);

  }
}
