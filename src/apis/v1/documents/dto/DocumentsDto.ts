import { IsString, IsDefined, IsOptional, IsBoolean, IsArray } from 'class-validator';
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
