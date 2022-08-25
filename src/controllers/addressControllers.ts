import {Request, Response} from "express";
import db from "../database";

class AddressController {

    //Crear address
    public async create(req:Request, res:Response):Promise<void> {
        await db.query('INSERT INTO address SET ?', [req.body]);
        res.json({message: 'Save Address'})
    }

    //Filtrador de address
    public async filterAddress(req:Request, res:Response):Promise<any>{
        const {idUser} = req.params;
        const item = await db.query('SELECT * FROM address where id_User = ?', [idUser]);
        res.json(item)
    }
    
    //filter fir5st address
    public async filterFirstAddress(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        const item = await db.query('SELECT * FROM address where id = ?', [id]);
        res.json(item[0])
    }

    //edit address
    public async update(req:Request, res:Response):Promise<void> {
        const {id} = req.params;
        await db.query('UPDATE address SET ? Where id=?', [req.body, id])
        res.json({message: 'The address update'})
    }

    //delete address
    public async delete(req:Request, res:Response):Promise<void> {  
        const {id} = req.params;
        await db.query('DELETE FROM address WHERE id= ?', [id])
        res.json({message: 'Address Delete.'})
    }

}

export const addressController = new AddressController();