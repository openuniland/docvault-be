import { IsString, IsDefined, IsArray, IsBoolean } from 'class-validator';
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
  @IsString()
  @IsDefined()
  author: string;

  @IsArray()
  @IsDefined()
  questions: ObjectId[];

  @IsString()
  @IsDefined()
  subject: ObjectId;
}

export class UpdateExamDto {
  @IsString()
  @IsDefined()
  author: string;

  @IsArray()
  @IsDefined()
  questions: ObjectId[];

  @IsString()
  @IsDefined()
  subject: ObjectId;

  @IsBoolean()
  is_deleted: boolean;

  @IsBoolean()
  is_approved: boolean;
}
