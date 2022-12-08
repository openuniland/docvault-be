import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class SubjectDto {
  @IsString()
  @IsDefined()
  subjectName: string;
}

export class UpdateSubjectDto {
  @IsString()
  @IsDefined()
  subjectName: string;

  @IsBoolean()
  @IsDefined()
  isDelete: boolean;

  @IsBoolean()
  @IsDefined()
  isApproved: boolean;
}

export class ParamsSubjectDto {
  @IsString()
  @IsDefined()
  id: string;
}
