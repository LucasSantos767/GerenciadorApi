import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail({}, { message: 'Digite um endereço de email' })
  email: string;

  @IsString( { message: 'Digite uma senha' })
  password: string;
}