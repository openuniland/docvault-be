import { IsString, IsDefined, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';
export class DocumentDto {
  @IsString()
  @IsDefined()
  author: string;

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
  @IsBoolean()
  status: Boolean;

  @IsDefined()
  @IsObject()
  content: Object;
}
export class UpdateDocumentDto {
  @IsString()
  @IsDefined()
  author: string;

  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDefined()
  @IsObject()
  content: Object;
}
export class ParamsDocumentDto {
  @IsDefined()
  @IsString()
  id: string;
}
