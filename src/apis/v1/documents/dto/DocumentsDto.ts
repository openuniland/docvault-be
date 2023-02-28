import { IsString, IsDefined, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Content } from 'utils/types';
export class DocumentDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDefined()
  @IsString()
  subject: ObjectId;

  @IsDefined()
  @IsNumber()
  semester: number;

  @IsDefined()
  @IsString()
  school_year: string;

  @IsOptional()
  @IsBoolean()
  is_approved: boolean;

  @IsDefined()
  @IsArray()
  content: Array<Content>;
}
export class UpdateDocumentDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_approved: boolean;

  @IsDefined()
  @IsArray()
  content: Array<Content>;
}
export class ParamsDocumentDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class DocumentFilter {
  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;
}
