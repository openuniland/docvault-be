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

export class UpdateExamDto {
  @IsArray()
  @IsOptional()
  questions: ObjectId[];

  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: ObjectId;

  @IsBoolean()
  is_deleted: boolean;

  @IsBoolean()
  is_approved: boolean;

  @IsNumber()
  @IsDefined()
  semester: number;

  @IsString()
  @IsDefined()
  school_year: string;
}
