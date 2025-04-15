import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { UserValidation } from './userValidation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,

    @Inject()
    private readonly userValidation: UserValidation,
  ) {}

  async createUser(userDto: UserDto): Promise<IUser> {
    await this.userValidation.validateEmail(userDto.email);

    const newUser = await this.userModel.create(userDto);

    return newUser.save();
  }
}
