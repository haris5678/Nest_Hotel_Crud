import { IsEmail, IsString, IsEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(['Admin', 'User'], {
    message: 'Valid role required',
  })
  role: 'Admin' | 'User';
}
