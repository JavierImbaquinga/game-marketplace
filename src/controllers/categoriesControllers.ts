import { Request, Response } from "express";
import db from "../database";

class CategoriesController {

    //Listar
    public async list(req:Request, res:Response):Promise <void>{
        const categories = await db.query('SELECT * FROM categories');
        res.json(categories);

    }

    //Listar un solo elemento
    public async listId(req:Request, res:Response):Promise <any>{
        const {id} = req.params;
        const category = await db.query('SELECT * FROM categories WHERE id = ?',[id])
        if(category.length > 0){
            return res.json(category[0])
        }
        res.status(404).json({text: "The category don't found"});
    }

    //filtrador de datos
    public async filterItem(req:Request, res:Response):Promise <any> {
        const {name} = req.params;
        const item = await db.query('SELECT * FROM categories WHERE name = ?',[name])
        if(item.length > 0){
            return res.json(item[0])
        }else {
            return res.json([])
        }
    }

    //filtrador por url
    public async filterUrl(req:Request, res:Response):Promise<any>{
        const {url} = req.params;
        const item = await db.query('SELECT * FROM categories WHERE url = ?', [url])
        res.json(item)
    }

    //Crear
    public async create(req:Request, res:Response):Promise <void> {
        await db.query('INSERT INTO categories SET ?', [req.body]);
        res.json({message: 'Save Categories'})
    }

    //Eliminar
    public async delete(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        await db.query('DELETE FROM categories WHERE id= ?', [id]);
        res.json({message: 'Category Delete'})
    }

    //Actualizar
    public async update(req:Request, res:Response):Promise<void> {
        const {id} = req.params;
        await db.query('UPDATE categories set ? WHERE id= ?', [req.body, id]);
        res.json({message: 'The category update'});
    }


}

export const categoriesController = new CategoriesController();