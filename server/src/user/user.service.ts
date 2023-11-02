import { Global, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, UserDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private authService: AuthService, private prismaService: PrismaService) {

    }

    async addUser(data: UserDto) {
        try {
            const userExists = await this.prismaService.user.findFirst({
                where: {
                    email: data.email
                }
            });
            if (userExists) {
                throw new Error("User already exists");
            }

            const token = await this.authService.generateToken(data);


            const password = await this.authService.generatePassword(data);
            data.password = password;

            const user = await this.prismaService.user.create({
                data: data
            });

            const userToken = await this.prismaService.userTokens.create({
                data: {
                    fk_user: user.id as never,
                    token: token,
                    isValid: true,
                }
            });

            delete user.password;

            return {
                user: user,
                token: token,
                msg: "User created successfully"
            }

        }
        catch (err) {
            throw err;
        }

    }

    async getUser(data) {
        try {
            console.log("data", data)
            const user = await this.prismaService.user.findFirst({
                where: {
                    email: data.email
                }
            });

            const { token } = await this.prismaService.userTokens.findFirst({
                where: {
                    fk_user: user.id as never,
                }
            })
            // console.log("user", user)

            if (!user) {
                throw new Error("Invalid email");
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            delete user.password;
            // delete data.email;



            return {
                user: user,
                token: token,
                msg: "User logged in successfully",
                statusCode: 200
            };

        }
        catch (err) {
            console.log(err)
            throw err;
        }

    }
}
