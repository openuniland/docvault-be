import { IsDefined, IsString, IsNumber } from 'class-validator';

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
  @IsNumber()
  position: number;
}
