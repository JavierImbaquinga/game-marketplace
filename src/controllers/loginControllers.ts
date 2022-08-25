import {NextFunction, Request, Response} from "express";
import db from "../database";
import jwt from 'jsonwebtoken'; 

class LoginController {
    //listar usuarios
    //crear usuarios
    public async create(req:Request, res:Response):Promise<void> {
        const newUser = await db.query('INSERT INTO users SET ?', [req.body])
        const token = jwt.sign({id: newUser.id}, 'yukarin')
        res.json({token})
    }

    public async LoginUser(req:Request, res:Response):Promise<any> {
        const {username} = req.params;
        const {password} = req.params;
        const item = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password])
        if(item.length > 0){
            const token = jwt.sign({id: item[0]["id"]}, 'yukarin', {
                expiresIn: 86400
            })
      
            return res.json({token})
        }else {
            return res.json([])
        }  
    }

    public async profile(req:Request, res:Response):Promise<any> {
        const profile = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(profile.length > 0){
            return res.json(profile[0])
        }else {
            return res.json([])
        }
    }

    
    //Actualizar
    public async updateInformation(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        await db.query('UPDATE users set ? WHERE id = ?', [req.body, id])
        return res.json({message:  req.body})
    }


    //Verify Email
    public async verifyEmail(req:Request, res:Response):Promise<any> {
        const {email} = req.params;
        const verify = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(verify.length > 0){
            return res.json(verify[0])
        }else {
            return res.json([])
        }
        
    }

    
}



export const loginController = new LoginController();