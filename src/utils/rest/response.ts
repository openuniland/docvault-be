/**
 * Standard API response object
 */
import {Response} from 'express'


export default class ApiResponse<T> {
  
  data:T = {} as T;
  // meta?: { [key: string]: any };
  // errors?: Error;
  message: string = 'Successfully';
  status: number = 200;

  constructor(data?:T, message?: string, status?: number) {
    data && (this.data = data);
    message && (this.message = message);
    status && (this.status = status);

  }
  public send(res : Response): void {
    res.status(this.status).json({
      data:this.data,
      message:this.message,
      status:this.status
    });
  }
}
