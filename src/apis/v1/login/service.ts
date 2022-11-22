import express from 'express';
import {Request} from 'express'
const jwt = require('jsonwebtoken')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)
import  UserModel  from 'models/schema/User';

async function verify(tokenGoogle: any, user: any){
    const ticket = await client.verifyToken({
        idToken: tokenGoogle,
        audience: process.env.CLIENT_ID
    });
    const payload = await ticket.getPayload();
    user.fullname = payload.fullname;
    user.email = payload.email;
    
    return user;
}

//check mail hou
async function checkHou(email: string){
    const user = await UserModel.findOne({ email });
    
    return user? user.email : null
}

//check role
async function checkRole(email: string){
    const user = await UserModel.findOne({ email});

    return user ? user.roles : null;
}

const login = async function (req: Request) {
    const tokenGoogle = req.headers.token_google;
    
    const EXPIRESIN = process.env.EXPIRESIN || '10d'

    const user = {
        name: String,
        email: String,
        token: String
    };
    let data : any;
    let message : any;
    let status = 10;

    const result = await verify(tokenGoogle, user);
    if(result){
        const role = await checkRole(result.email);
        const houMail = await checkHou(result.email);
        const tokenLogin = jwt.sign(
            {
            email: result.email,
            role: role, 
            houMail : houMail 
            },
            process.env.JWT_KEY,
            {
                expiresIn : EXPIRESIN
            }
        );
        data = {
            role: role,
            tokenLogin : tokenLogin,
            userName: result.name,

        };
        message = 'Loggin with Google successfully';
        status = 200;

    }else{
        data = undefined;
        message = 'Login with Google failed';
        status = 401;

    }
    return {
        data,
        message,
        status
    }
}
export {login}