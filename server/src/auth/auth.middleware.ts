import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      
      const token = req.headers.authorization.split(" ")[1];
      
      const dbToken = await this.prismaService.userTokens.findFirst({
        where: {
          token: token,
        },
      });
      if (!dbToken) {
        throw new Error("Invalid token");
      }

      const user_id = dbToken.fk_user;
      const user = await this.prismaService.user.findFirst({
        where: {
          id: user_id,
        },
      });
      if (!user) {
        throw new Error("Invalid user");
      }

      // Assign the user to req.body.user and the token to req.token
      req.user = user;
      req.token = token;

      // Log some information for debugging purposes
      console.log("Authenticated user:", user);
      console.log("Token:", token);

      console.log("AuthMiddleware: user authenticated");
      next();
    } catch (err) {
      console.error('AuthMiddleware Error:', err);
      res.status(401).json({
        error: 'Authentication failed',
      });
    }
  }
}
