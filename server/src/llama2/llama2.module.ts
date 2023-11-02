import { Module } from '@nestjs/common';
import { Llama2Service } from './llama2.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [Llama2Service],
  imports: [ConfigModule],
  exports: [Llama2Service],
})
export class Llama2Module {}
