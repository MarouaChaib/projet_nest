import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { AuthUserMiddleware } from 'src/auth/auth-user.middlware';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthUserMiddleware).forRoutes('article')
  }
}
