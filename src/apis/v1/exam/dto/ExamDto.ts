<<<<<<< HEAD
import { IsString, IsDefined, IsArray, IsBoolean, IsOptional, IsNumber } from 'class-validator';
=======
import { IsString, IsDefined, IsArray, IsBoolean, IsOptional } from 'class-validator';
>>>>>>> 4920e19 (feat/#48 (#58))
import { ObjectId } from 'mongoose';

export class ParamsExamDto {
  @IsString()
  @IsDefined()
  id: string;
}

export class QueryExamDto {
  @IsString()
  @IsDefined()
  subject_name?: string;
}

export class ExamDto {
<<<<<<< HEAD
=======
  @IsDefined()
  @IsString()
  author: ObjectId;

>>>>>>> 4920e19 (feat/#48 (#58))
  @IsArray()
  @IsDefined()
  questions: ObjectId[];

  @IsString()
  @IsDefined()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: string;

  @IsNumber()
  @IsDefined()
  semester: number;

  @IsString()
  @IsDefined()
  school_year: string;
}

export class UpdateExamDto {
<<<<<<< HEAD
=======
  @IsDefined()
  @IsString()
  author: ObjectId;

>>>>>>> 4920e19 (feat/#48 (#58))
  @IsArray()
  @IsOptional()
  questions: ObjectId[];

  @IsString()
  @IsOptional()
  subject: ObjectId;

  @IsString()
  @IsDefined()
  title: ObjectId;

  @IsBoolean()
  is_deleted: boolean;

  @IsBoolean()
  is_approved: boolean;

  @IsNumber()
  @IsDefined()
  semester: number;

  @IsString()
  @IsDefined()
  school_year: string;
}
