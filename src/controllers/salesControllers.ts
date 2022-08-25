import {Request,Response} from "express";
import db from "../database";

class SalesController {

    //listar
    public async list(req:Request, res:Response):Promise<void> {
        const sales = await db.query('SELECT * FROM sales');
        res.json(sales)
    }

}

export const salesController = new SalesController();