import { IsBoolean, IsDefined, IsObject, IsString , isBoolean } from "class-validator";



export class GetExamDto {
    @IsString()
    @IsDefined()
    id : string
}

export class GetExamOfSubject {
    @IsString()
    @IsDefined()
    nameOfSubject : string
}

export class CreatExam {
    @IsString()
    @IsDefined()
    author : string

    @IsObject()
    @IsDefined()
    question : object

    @IsString()
    @IsDefined()
    nameOfSubject : string

    @IsBoolean()
    @IsDefined()
    isApproved : boolean

}

export class UpdateExam {
    @IsString()
    @IsDefined()
    id : string

    @IsObject()
    @IsDefined()
    exam : object
}

export class DeleteExam {
    @IsString()
    @IsDefined()
    id : string
}