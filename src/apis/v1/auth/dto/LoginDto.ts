import { IsString, IsDefined } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  googleToken: string;
}
