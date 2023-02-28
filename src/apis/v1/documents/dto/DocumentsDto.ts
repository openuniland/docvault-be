import { IsString, IsDefined, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Content } from 'utils/types';
export class DocumentDto {
<<<<<<< HEAD
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
  @IsArray()
  content: Array<Content>;

  @IsString()
  @IsOptional()
  rank: string;
}

export class CreateDocumentRequestForAdmin {
=======
>>>>>>> 41bfadf (fix: remove validation for author field in DocumentDto)
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

  @IsOptional()
  @IsArray()
  content: Array<Content>;
}
export class UpdateDocumentByOwnerDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  content: Array<Content>;

  @IsDefined()
  @IsString()
  subject: ObjectId;

  @IsDefined()
  @IsNumber()
  semester: number;

  @IsDefined()
  @IsString()
  school_year: string;
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

export class UpdateDocumentByAdminDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  content: Array<Content>;

  @IsOptional()
  @IsString()
  subject: ObjectId;

  @IsOptional()
  @IsNumber()
  semester: number;

  @IsOptional()
  @IsString()
  school_year: string;

  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;
}
