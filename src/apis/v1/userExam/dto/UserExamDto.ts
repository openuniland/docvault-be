import { IsDefined, IsString, IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
export class UserExamDto {
  @IsNumber()
  @IsDefined()
  duration: number;

  @IsString()
  @IsDefined()
  exam_id: string;
}
export class AuthorIdDto {
  @IsDefined()
  @IsString()
  author: ObjectId;
}

export class ParamsUserExamDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class UserExamFilter {
  @IsString()
  @IsOptional()
  is_completed?: string;
}

export class SubmitTheExamDto {
  @IsString()
  @IsDefined()
  user_exam_id: string;
}
