import { IsString, IsDefined, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ParamsExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class QueryExamDto {
  @IsString()
  @IsDefined()
  subject_name: string;
}

export class ExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsArray()
  @IsDefined()
  questions: ObjectId[];

  @IsString()
  @IsDefined()
  subject: ObjectId;
}

export class UpdateExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsArray()
  @IsOptional()
  questions: ObjectId[];

  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsBoolean()
  is_deleted: boolean;

  @IsBoolean()
  is_approved: boolean;
}
