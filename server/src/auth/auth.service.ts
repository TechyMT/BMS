import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async generatePassword(data) {
        try {
            const password = bcrypt.hashSync(data.password, 10);
            return password;
        }
        catch (err) {
            throw err;
        }
    }

    async generateToken(data) {
        try {
            const token = jwt.sign(data, this.configService.get("JWT_SECRET"), { expiresIn: "1h" });
            return token;
        }
        catch (err) {
            throw err.message;
        }
    }
}
