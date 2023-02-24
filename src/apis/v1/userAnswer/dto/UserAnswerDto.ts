import { IsDefined, IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserAnswerDto {
  @IsDefined()
  @IsString()
  user_exam_id: string;

  @IsDefined()
  @IsNumber()
  number_of_answers: number;
}

export class ParamsUserAnswerDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class UpdateUserAnswerDto {
  @IsDefined()
  @IsString()
  answer_id: string;

  @IsDefined()
  @IsString()
  user_exam_id: ObjectId;

  @IsDefined()
  @IsNumber()
  position: number;
}
