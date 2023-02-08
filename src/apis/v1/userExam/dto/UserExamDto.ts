import { IsDefined, IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
export class UserExamDto {
  @IsNumber()
  @IsDefined()
  duration: number;

  @IsString()
  @IsDefined()
  exam_id: string;

  @IsString()
  @IsDefined()
  semester: string;
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
