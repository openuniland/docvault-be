import { IsString, IsDefined, IsArray, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ParamsExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class QueryExamDto {
  @IsString()
  @IsDefined()
  subject_name?: string;
}

export class ExamDto {
  @IsArray()
  @IsDefined()
  questions: ObjectId[];

  @IsString()
  @IsDefined()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: string;

  @IsNumber()
  @IsDefined()
  semester: number;

  @IsString()
  @IsDefined()
  school_year: string;
}

export class UpdateExamByOwnDto {
  @IsArray()
  @IsOptional()
  questions: ObjectId[];

  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: string;

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

  @IsNumber()
  @IsOptional()
  semester: number;

  @IsString()
  @IsOptional()
  school_year: string;

  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;
}
