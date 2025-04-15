import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUser } from '../interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { UserValidation } from './userValidation.provider';
import { hashPassword } from 'src/common/utils/bcryptJs.util';

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

    const hashedPassword = await hashPassword(userDto.password);

    const newUserDto = {
      ...userDto,
      password: hashedPassword,
    };

    try {
      const newUser = await this.userModel.create(newUserDto);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
