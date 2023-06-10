import { IsString, IsDefined, IsOptional, IsArray, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { PopupContent } from 'models/types/Popup';

export class DocumentDto {
  @IsDefined()
  @IsDate()
  start_date: Date;

  @IsDefined()
  @IsDate()
  end_date: Date;

  @IsDefined()
  @IsNumber()
  priority: number;

  @IsDefined()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  cover_image: string;

  @IsOptional()
  @IsBoolean()
  is_revoked: boolean;

  @IsOptional()
  @IsArray()
  contents: Array<PopupContent>;

  @IsOptional()
  @IsBoolean()
  is_target_all: boolean;

  @IsOptional()
  @IsArray()
  target_user: string[];
}
