import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    if (err || !user) {
      if (!email) {
        throw new HttpException(
          { message: 'email is required' },
          HttpStatus.OK,
        );
      } else if (!password) {
        throw new HttpException(
          { message: 'password is required' },
          HttpStatus.OK,
        );
      } else {
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
