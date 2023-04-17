import { IsString, IsDefined, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsBoolean()
  is_blocked: boolean;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  nickname: string;

  @IsOptional()
  @IsBoolean()
  is_show_info: boolean;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullname?: string;

  @IsOptional()
  @IsBoolean()
  is_blocked?: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  @IsOptional()
  @IsString()
  roles?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsBoolean()
  is_show_info?: boolean;
}
export class ParamsUserDto {
  @IsString()
  @IsDefined()
  id: string;
}
export class QueryUserDto {
  @IsString()
  @IsOptional()
  email?: string;
}
