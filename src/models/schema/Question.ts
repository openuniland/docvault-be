import { model, Model, Schema } from 'mongoose'

import { MODELS } from 'utils/constants/models'
import Question from '../types/Question'


const QuestionSchema = new Schema<Question>(
    {
        content : { type : String , required : true , unique : true },
        image : { type : String},
        subject : { type : String, required : true , ref : MODELS.subject },
        correct_answer : { type : String, required : true , ref : MODELS.answer },
        answers : [{answer : {type : String, required : true}}],
        is_deleted : { type : Boolean},
        accuracy : { type : String , enum : ['absolute' , 'relative'] },
        is_essay : { type : Boolean},
        is_approved : { type : Boolean },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)
const QuestionModel : Model<Question> = model<Question>(MODELS.question, QuestionSchema , MODELS.question)
export default QuestionModel