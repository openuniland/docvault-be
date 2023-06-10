import { IsString, IsDefined, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { PopupContent } from 'models/types/Popup';

export class DocumentDto {
  @IsDefined()
  @IsNumber()
  start_date: number;

  @IsDefined()
  @IsNumber()
  end_date: number;

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

export class ParamsPopupDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class DateRangePopupDto {
  @IsDefined()
  @IsNumber()
  start_date: number;

  @IsDefined()
  @IsNumber()
  end_date: number;
}
