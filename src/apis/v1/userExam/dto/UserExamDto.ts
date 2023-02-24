import { IsDefined, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
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
  @IsBoolean()
  @IsOptional()
  is_completed?: boolean;
}
