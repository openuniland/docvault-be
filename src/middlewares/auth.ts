import  ApiResponse  from 'utils/rest/response';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const authMiddleware = async(req : Request, res : Response, next: NextFunction)=>{
    const token = req.headers.token_login;
    try {
        const data = jwt.verify(token.toString(), process.env.JWT_KEY)
         if(data){
            req.body.user = data;
            next();

         }


    }
    catch (err) {
        new ApiResponse(err,'Login failed', 401).send(res);

    }
};

const adminMiddleware = (req : Request, res : Response, next: NextFunction) =>{
    const user = req.body.user;
    if(!user || user.roles != 'ADMIN'){
        new ApiResponse(null,'Login failed', 401).send(res);

    }else{
        next();
    }
};

const houMailMiddleware = (req : Request, res : Response, next: NextFunction) =>{
    const user = req.body.user;
    const houMail : string = '.hou.edu.vn'
    if(!user || !(user.email.include(houMail)) ){
        new ApiResponse(null,'Login failed', 401).send(res);
    }
    else{
        next();
    }
}
export {authMiddleware,adminMiddleware, houMailMiddleware};