import { model, Model, Schema } from 'mongoose'

import { MODELS } from 'utils/constants/models'
import Documents from 'models/types/Document'

const DocumentSchema = new Schema<Documents>(
    {
        title : { type : String , required : true},
        description : { type : String},
        subject : { type : String, required : true , ref : MODELS.subject},
        status : { type : Boolean, required : true},
        is_deleted : { type : Boolean},
        content : { type : Object , required : true},
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

const DocumentModel : Model<Document> = model<Document>(MODELS.document , DocumentSchema , MODELS.document)
export default DocumentModel
