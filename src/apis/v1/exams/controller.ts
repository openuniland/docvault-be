import { Request , Response } from "express"
import ApiResponse from "utils/rest/response"
import * as service from './service'


const getExams = async (req : Request, res : Response) => {
    const result = await service.getExams()
    new ApiResponse(result).send(res)
}

const getExam = async (req: Request, res :Response) => {
   const result = await service.getExam(req)
   new ApiResponse(result).send(res)
}

const getExamOfSubject = async (req : Request, res : Response) => {
    const result = await service.getExamOfSubject(req)
    new ApiResponse(result.data , result.message , result.status)
}

const createExam = async (req : Request, res : Response) => {
    const result = await service.createExam(req)
    new ApiResponse(result.data , result.message , result.status)
}

const updateExam = async (req : Request, res : Response) => {
    const result = await service.updateExam(req)
    new ApiResponse(result.data , result.message , result.status)
}

const deleteExam = async (req : Request, res : Response) => {
    const result = await service.deleteExam(req)
    new ApiResponse(result).send(res)
}

export {getExams , getExam , getExamOfSubject , createExam , updateExam , deleteExam}
