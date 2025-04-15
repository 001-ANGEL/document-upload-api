import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { comparePassword } from 'src/common/utils/bcryptJs.util';
import { IUser } from 'src/user/interface/user.interface';
import { LoginDto } from '../dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthValidation {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async validateLogin(loginDto: LoginDto){
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
}
