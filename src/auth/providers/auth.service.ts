import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthValidation } from './auth-validation.provider';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly authValidation: AuthValidation,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.authValidation.validateLogin(loginDto);

    const payload = { sub: user._id };

    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);

    return {
      access_token: accessToken,
    };
  }
}
