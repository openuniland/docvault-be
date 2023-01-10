import { IsString, IsDefined } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsDefined()
  refreshToken: string;
}
