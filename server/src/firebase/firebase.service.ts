import { Inject, Injectable } from '@nestjs/common';
import { app } from "firebase-admin";
import * as multer from 'multer';


@Injectable()
export class FirebaseService {
    constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) { }

    async uploadFile(file, fileName) {
        try {
            const bucket = this.firebaseApp.storage().bucket();
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (err) => {
                console.log(err);
            });

            blobStream.on('finish', () => {
                console.log("finished");
            });

            blobStream.end(file.buffer);
            const publicUrl:string = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            return publicUrl;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
