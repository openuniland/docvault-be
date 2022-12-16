import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsBoolean()
  @IsDefined()
  status: boolean;
}

export class ParamsAnswerDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class UpdateAnswerDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsBoolean()
  @IsDefined()
  is_deleted: boolean;

  @IsBoolean()
  @IsDefined()
  status: boolean;
}
