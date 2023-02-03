import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class SubjectDto {
  @IsString()
  @IsDefined()
  subject_name: string;
}

export class UpdateSubjectDto {
  @IsString()
  @IsDefined()
  subject_name: string;

  @IsBoolean()
  @IsDefined()
  is_deleted: boolean;

  @IsBoolean()
  @IsDefined()
  is_approved: boolean;
}

export class ParamsSubjectDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class QuerySubjectDto {
  @IsDefined()
  @IsString()
  @IsOptional()
  is_approved: string;
}
