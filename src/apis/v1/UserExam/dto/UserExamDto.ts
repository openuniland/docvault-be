import { IsDefined, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';
export class UserExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsDefined()
  @IsString()
  exam: ObjectId;
}

export class UpdateUserExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsDefined()
  @IsString()
  exam: ObjectId;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;
}

export class ParamsUserExamDto {
  @IsDefined()
  @IsString()
  id: string;
}
