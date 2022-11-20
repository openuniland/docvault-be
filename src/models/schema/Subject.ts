import { model, Model, Schema } from 'mongoose'

import { MODELS } from 'utils/constants/models'
import Subject from '../types/Subject'

const SubjectSchema = new Schema<Subject>(
    {
        subject_name : { type : String , required : true},
        functions : [{function : {type : String}}],
        is_deleted : { type : Boolean },
        is_approved : { type : Boolean },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

const SubjectModel : Model<Subject> = model<Subject>(MODELS.subject , SubjectSchema , MODELS.subject)
export default SubjectModel

