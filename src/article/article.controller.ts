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
  @UseGuards(AuthGuard) // utilise le décorateur @UseGuards pour appliquer une garde d'authentification à la route de création d'article. Cela signifie que seuls les utilisateurs authentifiés pourront accéder à cette route et créer des articles.
  async createArticle( @Body() ArticleRequestDto : ArticleRequestDto , @CurrentUser() currentUser: User) {
    return this.articleService.save(ArticleRequestDto, currentUser);
  }

}
