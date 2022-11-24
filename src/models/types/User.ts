import { Document } from 'mongoose';

enum Roles {
  ADMIN,
  APPROVER,
  USER,
}
export default interface User extends Document {
  fullname: string;
  email: string;
  isBlocked: boolean;
  roles: Roles;
}
