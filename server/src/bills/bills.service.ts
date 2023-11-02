import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Llama2Service } from 'src/llama2/llama2.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TesseractService } from 'src/tesseract/tesseract.service';
import { BillDto } from './dto';
import { OpenAiService } from 'src/open-ai/open-ai.service';



@Injectable()
export class BillsService {
    constructor(private tesseractService: TesseractService, private openaiService: OpenAiService, private prismaService: PrismaService,
        private firebaseService: FirebaseService, private llama2Service: Llama2Service) { }

    async convertImageToText(file, fileName: string) {
        try {
            const publicUrl = await this.firebaseService.uploadFile(file, fileName);
            console.log(publicUrl);
            // const publicUrl = "abc"
            const { text } = await this.tesseractService.convertToText(file.buffer);
            console.log("extracted text", text);
            // const response = await this.openaiService.getJson(text);
            const response = await this.llama2Service.getJson(text);
            response.imageUrl = publicUrl;
            response.fk_user = 1;
            const data = response as BillDto;
            console.log("data", data)
            const { bill } = await this.createBill(data);
            return {
                msg: "success",
                statusCode: 200,
                // bill: bill
            }
            // 
        }
        catch (err) {
            console.log(err);
            return {
                err: err,
                statusCode: 500,
            }
        }
    }

    async createBill(data: BillDto) {
        try {
            const bill = await this.prismaService.bills.create({
                data: data,
            });
            return {
                bill: bill
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getBills(user: number) {
        try {
            const bills = await this.prismaService.bills.findMany({
                where: {
                    fk_user: user,
                }
            });
            return bills
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }

    async deleteBills(id: number) {
        try {
            const bills = await this.prismaService.bills.delete({
                where: {
                    id: id,
                }
            });
            return bills
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }

    async updateBills(id: number, data: BillDto) {
        try {
            const bills = await this.prismaService.bills.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return bills
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }

    async getBillsById(id: number) {
        try {
            const bills = await this.prismaService.bills.findUnique({
                where: {
                    id: Number(id),
                }
            });
            return bills
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }
}
