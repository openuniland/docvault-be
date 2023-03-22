import { IsString, IsDefined, IsArray, IsOptional, IsBoolean, IsObject } from 'class-validator';
import Answer from 'models/types/Answer';
import { ObjectId } from 'mongoose';
export class QuestionDto {
  @IsString()
  @IsDefined()
  exam_id: ObjectId;

  @IsString()
  @IsDefined()
  content: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsDefined()
  @IsObject()
  correct_answer: Answer;

  @IsOptional()
  @IsArray()
  answers: Answer[];

  @IsDefined()
  @IsString()
  accuracy: string;

  @IsOptional()
  @IsBoolean()
  is_essay: boolean;

  @IsOptional()
  @IsBoolean()
  is_approved: boolean;
}

export class UpdateQuestionDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsDefined()
  @IsObject()
  correct_answer: Answer;

  @IsOptional()
  @IsArray()
  answers: Answer[];

  @IsDefined()
  @IsString()
  accuracy: string;

  @IsOptional()
  @IsBoolean()
  is_essay: boolean;
}
export class ParamsQuestionDto {
  @IsDefined()
  @IsString()
  id: string;
}
