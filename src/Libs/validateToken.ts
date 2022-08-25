
import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    iat: number;
    exp:number;
}

export const TokenValidation = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('authToken');
    if(!token) return res.status(401).json('Acceso denegado')
    if(token !==''){
        const payload = jwt.verify(token, 'yukarin') as IPayload;
        console.log(payload)
        req.userId = payload.id;

        next();
    }else {
        res.status(401).json('Token vacio')
    }
    
}