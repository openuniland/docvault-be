<<<<<<< HEAD
import { IsString, IsDefined, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Content } from 'utils/types';
export class DocumentDto {
=======
import { IsString, IsDefined, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Content } from 'utils/types';
export class DocumentDto {
  @IsString()
  @IsDefined()
  author: string;

>>>>>>> 6560186 (feat/#13 (#41))
  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDefined()
  @IsString()
  subject: ObjectId;

<<<<<<< HEAD
  @IsDefined()
  @IsNumber()
  semester: number;

  @IsDefined()
  @IsString()
  school_year: string;

=======
>>>>>>> 6560186 (feat/#13 (#41))
  @IsOptional()
  @IsBoolean()
  is_approved: boolean;

  @IsDefined()
  @IsArray()
  content: Array<Content>;
}
export class UpdateDocumentDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_approved: boolean;

  @IsDefined()
  @IsArray()
  content: Array<Content>;
}
export class ParamsDocumentDto {
  @IsDefined()
  @IsString()
  id: string;
}
<<<<<<< HEAD

export class DocumentFilter {
  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;
}
=======
>>>>>>> 6560186 (feat/#13 (#41))
