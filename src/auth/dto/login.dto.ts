import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from 'src/user/dto/user.dto';

export class LoginDto extends OmitType(UserDto, ['fullName'] as const) {}
