import { IsString, IsDefined, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsDefined()
  fullname: string;

  @IsString()
  @IsDefined()
  email: string;

  @IsOptional()
  @IsBoolean()
  is_blocked: boolean;

  @IsOptional()
  @IsString()
  role: string;
}
