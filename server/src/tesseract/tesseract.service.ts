import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class TesseractService {
    constructor() { }

    async convertToText(buffer) {
        try {

            // same code as before
            const worker = await createWorker('eng')
            const { data: { text } } = await worker.recognize(buffer);

            await worker.terminate();
            return {
                text
            }

        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

}
