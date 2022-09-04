import { Request, Response } from "express";
import db from "../database";

class CategoriesController {

    //Listar
    public async list(req:Request, res:Response):Promise <void>{
        try {
            const categories = await db.query('SELECT * FROM categories');
            res.json(categories);
        }catch(error){
            console.log('error ', error)
        }
        

    }

    //Listar un solo elemento
    public async listId(req:Request, res:Response):Promise <any>{
        try {
            const {id} = req.params;
            const category = await db.query('SELECT * FROM categories WHERE id = ?',[id])
            if(category.length > 0){
                return res.json(category[0])
            }
            res.status(404).json({text: "The category don't found"});
        }catch(error){
            console.log('error ', error)
        }
        
    }

    //filtrador de datos
    public async filterItem(req:Request, res:Response):Promise <any> {
        try {
            const {name} = req.params;
            const item = await db.query('SELECT * FROM categories WHERE name = ?',[name])
            if(item.length > 0){
                return res.json(item[0])
            }else {
                return res.json([])
            }
        }catch(error){
            console.log('error ', error)
        }
       
    }

    //filtrador por url
    public async filterUrl(req:Request, res:Response):Promise<any>{
        try {
            const {url} = req.params;
            const item = await db.query('SELECT * FROM categories WHERE url = ?', [url])
            res.json(item)
        }catch(error){
            console.log('error ', error)
        }
       
    }

    //Crear
    public async create(req:Request, res:Response):Promise <void> {
        try {
            await db.query('INSERT INTO categories SET ?', [req.body]);
            res.json({message: 'Save Categories'})
        }catch(error){
            console.log('error ', error)
        }
        
    }

    //Eliminar
    public async delete(req:Request, res:Response):Promise<any> {
        try {
            const {id} = req.params;
            await db.query('DELETE FROM categories WHERE id= ?', [id]);
            res.json({message: 'Category Delete'})
        }catch(error){
            console.log('error ', error)
        }
        
    }

    //Actualizar
    public async update(req:Request, res:Response):Promise<void> {
        try {
            const {id} = req.params;
            await db.query('UPDATE categories set ? WHERE id= ?', [req.body, id]);
            res.json({message: 'The category update'});
        }catch(error){
            console.log('error ', error)
        }
        
    }


}

export const categoriesController = new CategoriesController();