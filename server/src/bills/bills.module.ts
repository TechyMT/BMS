import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TesseractModule } from 'src/tesseract/tesseract.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Llama2Module } from 'src/llama2/llama2.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OpenAiModule } from 'src/open-ai/open-ai.module';



@Module({
  imports: [TesseractModule, FirebaseModule,Llama2Module,PrismaModule, OpenAiModule ],
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}

