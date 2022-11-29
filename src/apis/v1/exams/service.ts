import { Request } from "express"
import Exam from "models/types/Exam"
import Subject from "models/types/Subject"
import { ExamModel , SubjectModel } from "models"







// Get all exams

const getExams = async () => {
    const result = await ExamModel.find({})
    return result
}

// Get a exam
const getExam = async (req:Request) => { 

    const result = await ExamModel.findById(req.params.id);
	return result;
}

// Get exam with subject

const getExamOfSubject = async (req: Request) => { 
    const subject = req.query.subject
    try {
       const exam : Exam = await ExamModel.findOne({
         where : {subject}
       })
       .populate('question')
     

       if(exam) 
       return {
           data :  exam,
           message : `lấy thành công các exam của môn học :  ${req.query.subject}`,
           status : 200,
       }
       else {
        return {
            message : 'môn học không tồn tại không tồn tại',
            status : 400,
        }
       }
    } catch (error) {
       console.log(error)
       return {
           message :`Eror ${error.messeage}`,
           status : 500,
       }
    }

    
}


// Creat new exam
const createExam = async (req: Request) => {
   const {author ,question ,  subject_name , is_approved} = req.body
   
   let subject = {
       subject_name,
       is_deleted : false,
       is_approved : true
   } as Subject
   const existingSubject = await SubjectModel.findOne({
    where : {subject_name}
   })

   if(!existingSubject) {
    const infoSubject = await SubjectModel.create(subject)
    subject = infoSubject
   }

   const newExam = {
    author,
    question,
    subject,
    is_approved,
   }
   
   const data = await ExamModel.create(newExam)
   return {
    data,
    message : 'tạo exam thành công',
    status : 200,
    
   }
   
   
}

// Update exam
const updateExam = async (req: Request) => {
	const _id = req.params.id;
	const exam = req.body.exam;
	const data = await ExamModel.findByIdAndUpdate(_id, exam);
	return {
        data,
        message : 'cập nhật thành công',
        status : 200,
    };
};
// Delete exam
const deleteExam = async (req: Request) => {
	const _id = req.params.id;
	const result = await ExamModel.findOne({ _id });
	await ExamModel.findByIdAndDelete(_id);
	
	
	return result;
};

export { getExam , getExams , getExamOfSubject , createExam , updateExam , deleteExam }
