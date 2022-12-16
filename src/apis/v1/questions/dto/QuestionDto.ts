// import Subject from 'models/types/Subject';
import Answer from 'models/types/Answer';
import { IsString, IsDefined, IsArray, IsOptional } from 'class-validator';
export class QuestionDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsDefined()
  @IsString()
  subject: string;

  @IsDefined()
  @IsString()
  correct_answer: string;

  @IsOptional()
  @IsArray()
  answers: Answer[];

  @IsOptional()
  @IsString()
  accuracy: string;

  //   @IsOptional()
  //   @IsBoolean()
  //   is_essay: boolean;
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
  subject: string;

  @IsDefined()
  @IsString()
  correct_answer: string;

  @IsOptional()
  @IsArray()
  answers: Answer[];
}
export class ParamsQuestionDto {
  @IsDefined()
  @IsString()
  id: string;
}
