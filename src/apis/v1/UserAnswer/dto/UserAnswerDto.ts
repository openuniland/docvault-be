import { IsDefined, IsArray, IsString, IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserAnswerDto {
  @IsDefined()
  @IsArray()
  answers: ObjectId[];

  @IsDefined()
  @IsString()
  user_exam: ObjectId;
}

export class ParamsUserAnswerDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class UpdateUserAnswerDto {
  @IsDefined()
  @IsArray()
  answers: ObjectId[];

  @IsDefined()
  @IsString()
  user_exam: ObjectId;

  @IsBoolean()
  is_deleted: boolean;
}
