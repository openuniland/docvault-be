import {  Response } from "express"
import { GetExamDto, GetExamOfSubject , CreatExam , UpdateExam , DeleteExam} from "./dto/Exams"
import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';



const getExams = async (req: RequestWithUser, res: Response) => {
    const result = await service.getExams()
    res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
}

const getExam  = async (req : RequestWithUser , res : Response) => {
   const input = req.params.id
   const idExam : GetExamDto = {id : input}

   const result = await service.getExam(idExam)
   res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
   
}

const getExamOfSubject = async (req : RequestWithUser , res : Response) => {
    const input = req.body.subject_name
    const subjectName : GetExamOfSubject = {nameOfSubject : input}

    const result = await service.getExamOfSubject(subjectName)
    if(result) res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
    else res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'Subject does not exist'))

}

const createExam = async (req : RequestWithUser , res : Response) => { 
    const {author , question , subject_name , is_approved} = req.body 
    const input : CreatExam = {author, question, nameOfSubject : subject_name,isApproved : is_approved}

    const result = await service.createExam(input)
    res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));

}

const updateExam = async (req : RequestWithUser , res : Response) => { 
    const idInput = req.params.id
    const examInput = req.body.exam
    const inputUpdate : UpdateExam = {id : idInput , exam : examInput}

    const result = await service.updateExam(inputUpdate)
    res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
}

const deleteExam = async (req : RequestWithUser , res : Response) => { 
    const input = req.params.id
    const idExam : DeleteExam = {id : input}

    const result = await service.deleteExam(idExam)
    res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
}

export {getExams, getExam , getExamOfSubject , createExam , updateExam , deleteExam }