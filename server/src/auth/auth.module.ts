import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[ConfigModule, PrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
