import { IsDefined, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
export class UserExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsDefined()
  @IsString()
  exam: ObjectId;
}

export class ParamsUserExamDto {
  @IsDefined()
  @IsString()
  id: string;
}
