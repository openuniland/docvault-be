import { IsDefined, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ParamGetExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class GetExamsOfSubjectDto {
  @IsString()
  @IsDefined()
  subjectId: ObjectId;
}

export class ExamDto {
  @IsString()
  @IsDefined()
  author: string;

  @IsObject()
  @IsDefined()
  question: object;

  @IsObject()
  @IsDefined()
  subject: ObjectId;
}

export class ParamUpdateExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class UpdateExamDto {
  @IsObject()
  @IsDefined()
  author: string;

  @IsObject()
  @IsDefined()
  questions: ObjectId[];

  @IsObject()
  @IsDefined()
  subject: ObjectId;
}

export class ParamDeleteExamDto {
  @IsString()
  @IsDefined()
  id: string;
}
