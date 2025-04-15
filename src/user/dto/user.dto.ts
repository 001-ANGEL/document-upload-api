import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
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
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
      minLowercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
    },
  )
  password: string;
}
