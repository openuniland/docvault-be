import { IsString, IsDefined } from 'class-validator';

export class UserDto {
  @IsString()
  @IsDefined()
  fullname: string;

  @IsString()
  @IsDefined()
  email: string;

  @IsDefined()
  is_blocked: boolean;

  @IsString()
  @IsDefined()
  role: string;
}
