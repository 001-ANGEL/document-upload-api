import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/providers/user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,

    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() userDto: UserDto) {
    try {
      const user = await this.userService.createUser(userDto);
      return {
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user');
    }
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.login(loginDto);
      
      return {
        message: 'User logged in successfully',
        user
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error logging in user');
    }
  }
}
