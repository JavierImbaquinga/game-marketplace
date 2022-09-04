
import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    iat: number;
    exp:number;
}

export const TokenValidation = (req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
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