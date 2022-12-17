import { IsString, IsDefined, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';
export class QuestionDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsDefined()
  @IsString()
  subject: ObjectId;

  @IsDefined()
  @IsString()
  correct_answer: ObjectId;

  @IsOptional()
  @IsArray()
  answers: ObjectId[];

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
  @IsString()
  subject: ObjectId;

  @IsDefined()
  @IsString()
  correct_answer: ObjectId;

  @IsOptional()
  @IsArray()
  answers: ObjectId[];
}
export class ParamsQuestionDto {
  @IsDefined()
  @IsString()
  id: string;
}
