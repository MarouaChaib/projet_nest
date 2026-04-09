import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
//module sert à organiser le code en regroupant les composants liés à une fonctionnalité spécifique(dans ce cas, la gestion des emails).
@Module({
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
