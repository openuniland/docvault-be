import { IsString, IsDefined, IsArray, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ParamsExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class ExamDto {
  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  semester: number;

  @IsString()
  @IsOptional()
  school_year: string;

  @IsString()
  @IsOptional()
  rank: string;
}

export class UpdateExamByOwnerDto {
  @IsString()
  @IsDefined()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsDefined()
  semester: number;

  @IsString()
  @IsDefined()
  school_year: string;
}

export class UpdateExamByAdminDto {
  @IsArray()
  @IsOptional()
  questions: ObjectId[];

  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  semester: number;

  @IsString()
  @IsOptional()
  school_year: string;

  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;

  @IsBoolean()
  @IsOptional()
  is_draft?: boolean;
}
