import {Document} from 'mongoose'

export default interface User extends Document {
   fullname : string;
   email : string;
   is_blocked : boolean;
   roles : 'ADIM' | 'USER';
}