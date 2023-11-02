import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, UserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("register")
    async register(@Body() body: UserDto) {
        try {
            console.log("body", body)
            return this.userService.addUser(body);
        }
        catch (err) {
            return {
                err: err,
                statusCode: 400,
            }
        }
    }

    @Post("login")
    async login(@Body() body: any) {
        try {
            console.log("body", body)


            const user = await this.userService.getUser(body);
            console.log("user", user);
            return user;
        }
        catch (err) {
            return {
                err: err,
                statusCode: 400,
                msg:err.message
            }
        }
    }
}
