import { ErrorCodes, ERROR_CODES, HttpException } from 'exceptions';
import { ExamModel , SubjectModel} from "models"
import Subject from 'models/types/Subject';
import { GetExamDto , GetExamOfSubject , CreatExam , UpdateExam , DeleteExam} from './dto/Exams';
import { logger } from 'utils/logger';


const getExams = async () => {
    try {
        const exams = await ExamModel.find({})

        return exams
    } catch (error) {
        logger.error(`Error: ${error}`);
        throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
    }
}

const getExam = async (input : GetExamDto ) =>  {
   try {
     const {id} = input
     const exam = await ExamModel.findById(id)
       .populate('question')
       .populate('subject')
     
     return exam
   } catch (error) { 
      logger.error(`Error: ${error}`);
      throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
   }
}


const getExamOfSubject = async (input : GetExamOfSubject) => {
    try {
       const subject = input.nameOfSubject
       const examOfSubject = await ExamModel.findOne({
          where : {subject}
       })
       .populate('question')
       .populate('subject')

       return examOfSubject
    } catch (error) { 
      logger.error(`Error: ${error}`);
      throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
    }
}


const createExam = async (input : CreatExam ) => {
   try {
      const {author , nameOfSubject , question , isApproved} = input
      let subject = {
        subject_name : nameOfSubject,
        is_deleted : false,
        is_approved : true
      } as Subject

      const existingSubject = await SubjectModel.findOne({
        where : {subject_name : nameOfSubject}
      })

      if(!existingSubject) {
        const infoSubject = await SubjectModel.create(subject)
        subject = infoSubject
      }

      const newExam = {
        author,
        question,
        subject,
        is_approved : isApproved 
       }
       const data = await ExamModel.create(newExam)

       return data
   } catch (error) { 
     logger.error(`Error: ${error}`);
     throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
   }

}

const updateExam = async (input : UpdateExam) => {
   try {
     const {id , exam} = input
     const data = await ExamModel.findByIdAndUpdate(id,exam)

     return data
   } catch (error) { 
    logger.error(`Error: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
   }
}

const deleteExam = async (input : DeleteExam ) => {
  try {
     const id = input.id
     const data = await ExamModel.findByIdAndDelete(id)
    
     return data

  }
  catch (error) {
    logger.error(`Error: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE)
  }
}



export { getExam , getExams , getExamOfSubject , createExam , updateExam , deleteExam} 