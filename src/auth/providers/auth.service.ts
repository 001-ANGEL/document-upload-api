import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthValidation } from './auth-validation.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly authValidation: AuthValidation,
  ) {}

  async login(loginDto: LoginDto) {
  
    await this.authValidation.validateLogin(loginDto);
    
    return {
        'message': 'Login successful',
    }

  }
}
