import { IsString, IsDefined } from 'class-validator';

export class UserDto {
  @IsString()
  @IsDefined()
  fullname: string;

  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  is_blocked: boolean;

  @IsString()
  @IsDefined()
  roles: string;
}
