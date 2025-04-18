import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { comparePassword } from 'src/common/utils/bcryptJs.util';
import { IUser } from 'src/user/interface/user.interface';
import { LoginDto } from '../dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/user/interface/jwt.interface';

@Injectable()
export class AuthValidation {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,

    private readonly configService: ConfigService,
  ) {}

  async validateLogin(loginDto: LoginDto): Promise<IUser> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    const isPasswordValid = user
      ? await comparePassword(loginDto.password, user.password)
      : false;

    if (!user || !isPasswordValid) {
      throw new HttpException(
        'Please check your credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async extractTokenFromHeader(req: any): Promise<string> {
    const authHeader = req.headers['authorization'];

    const bearer = authHeader && authHeader.split(' ')[0];
    if (!authHeader || bearer !== 'Bearer') {
      throw new HttpException(
        'Invalid token or incorrect format',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new HttpException('Invalid token format', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }

  async validateToken(token: string) {
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    try {
      const secretJwt = this.configService.get<string>('jwt.secret');
      const decoded = jwt.verify(token, secretJwt) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
