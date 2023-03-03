import { IsDefined, IsOptional, IsString } from 'class-validator';

export class SubjectDto {
  @IsString()
  @IsDefined()
  subject_name: string;
}

export class UpdateSubjectDto {
  @IsString()
  @IsDefined()
  subject_name: string;
}

export class ParamsSubjectDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class QuerySubjectDto {
  @IsOptional()
  @IsString()
  is_approved?: string;
}
