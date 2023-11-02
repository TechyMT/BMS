import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { TesseractService } from './tesseract/tesseract.service';
import { TesseractModule } from './tesseract/tesseract.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { FirebaseModule } from './firebase/firebase.module';
import { Llama2Module } from './llama2/llama2.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true
  }), PrismaModule, TesseractModule, UserModule, AuthModule, BillsModule, FirebaseModule, Llama2Module, OpenAiModule],

  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("user/register", "bills", "bills/upload", "user/login")
      .forRoutes("*")


  }
}
