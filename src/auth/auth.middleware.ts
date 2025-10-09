import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const payload = await this.authService.validateToken(token);
      req['user'] = payload;
      next();
    } catch (error) {
      console.log('middleware authorization token invalid', error);
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }
}
