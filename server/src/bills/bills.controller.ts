import { Body, Controller, Get, Post, UseInterceptors, UploadedFile, UseGuards, Header, Delete, Param, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TesseractService } from 'src/tesseract/tesseract.service';
import { BillsService } from './bills.service';
import { memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { Response, Request } from 'express';


@Controller('bills')
export class BillsController {
    constructor(
        private billsService: BillsService,
    ) { }


    @Post("upload")
    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
    }))
    async getTextofBills(@UploadedFile() file, @Body() body) {
        try {
            console.log("body", body);
            console.log(file);
            const fileName = `${uuidv4()}-${file.originalname}`;
            if (fileName.endsWith(".pdf")) {

            }
            const data = await this.billsService.convertImageToText(file, fileName);
            return {
                ...data
            }
        }
        catch (err) {
            console.log(err);
            return {
                err: err.message,
                statusCode: 500,
            }
        }
    }

    @Get()
    async getBills() {
        try {
            // console.log("req", req.user);
            const id = 1;
            const data = await this.billsService.getBills(id);
            return {
                bills: data
            }
        }
        catch (err) {
            console.log(err);
            return {
                err: err.message,
                statusCode: 500,
            }
        }
    }

    @Delete(":id")
    async deleteBills(@Param("id") id: number) {
        try {
            const data = await this.billsService.deleteBills(Number(id));
            return {
                bills: data,
                statusCode: 200
            }
        }
        catch (err) {
            console.log(err);
            return {
                err: err.message,
                statusCode: 500,
            }
        }
    }

    @Put(":id")
    async updateBills(@Param("id") id: number, @Body() body) {
        try {
            const data = await this.billsService.updateBills(Number(id), body);
            return {
                bills: data,
                statusCode: 200
            }
        }
        catch (err) {
            console.log(err);
            return {
                err: err.message,
                statusCode: 500,
            }
        }
    }

    @Get(":id")
    async getBillsById(@Param("id") id: number) {
        try {
            const data = await this.billsService.getBillsById(id);
            return {
                bills: data,
                statusCode: 200
            }
        }
        catch (err) {
            console.log(err);
            return {
                err: err.message,
                statusCode: 500,
            }
        }
    }




}
