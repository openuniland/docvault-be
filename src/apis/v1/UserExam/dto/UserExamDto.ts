import { IsDefined, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
export class UserExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsDefined()
  @IsString()
  exam: ObjectId;

  @IsNumber()
  @IsDefined()
  duration: number;
}
export class UpdateUserExamDto {
  @IsDefined()
  @IsString()
  author: ObjectId;

  @IsDefined()
  @IsString()
  exam: ObjectId;

  @IsNumber()
  @IsDefined()
  duration: number;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsBoolean()
  is_complete: boolean;
}

export class ParamsUserExamDto {
  @IsDefined()
  @IsString()
  id: string;
}
