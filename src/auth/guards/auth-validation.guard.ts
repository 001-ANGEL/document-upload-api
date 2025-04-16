import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthValidation } from '../providers/auth-validation.provider';
import e, { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class AuthValidationGuard implements CanActivate {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,

    private readonly authValidation: AuthValidation,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = await this.authValidation.extractTokenFromHeader(request);
    const decoded = await this.authValidation.validateToken(token);

    const existingUser = await this.userModel.findOne({
      _id: decoded.userId,
    });

    if (!existingUser) {
      throw new UnauthorizedException('Not authorized');
    }
    return true;
  }
}
