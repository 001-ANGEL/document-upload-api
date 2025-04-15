import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
      minLowercase: 0,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
    },
  )
  password: string;
}
