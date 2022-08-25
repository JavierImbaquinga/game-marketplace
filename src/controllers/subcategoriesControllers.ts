import {Request, Response} from "express";
import db from "../database";

class SubcategoriesController {
    //listar
    public async list(req:Request, res:Response):Promise <void> {
        const subcategories = await db.query('SELECT * FROM subcategories');
        res.json(subcategories);
    }

    //Listar un solo elemento
    public async listId(req:Request, res:Response):Promise <any> {
        const {id} = req.params;
        const subcategory = await db.query('SELECT * FROM subcategories WHERE id = ?',[id]);
        if(subcategory.length > 0){
            return res.json(subcategory[0]);
        }
        res.status(404).json({text: "The subcategory don't found"})
    }

    //Filtrador de datos
    public async filterItem(req:Request, res:Response):Promise<any> {
        const {name} = req.params;
        const item = await db.query('SELECT * FROM subcategories WHERE name = ?',[name])
        if(item.length > 0){
            return res.json(item[0])
        }else {
            return res.json({text: "The item don't found"})
        }
    }

    //filtrador por titulos de categoria
    public async filterTitleCategory(req:Request, res:Response):Promise<any> {
        const {title} = req.params;
        const item = await db.query('SELECT * FROM subcategories WHERE title_list = ?',[title])
        res.json(item);
    }

    //filter categories
    public async filterCategory(req:Request, res:Response):Promise<any> {
        const {idCategory} = req.params;
        const item = await db.query('SELECT * FROM subcategories WHERE category = ?',[idCategory])
        res.json(item);
    }

    //filtrador por url
    public async filterUrl(req:Request, res:Response):Promise<any>{
        const {url} = req.params;
        const item = await db.query('SELECT * FROM subcategories WHERE url = ?', [url])
        res.json(item)
    }

    //Crear
    public async create(req:Request, res:Response):Promise<void> {
        await db.query('INSERT INTO subcategories SET ?', [req.body]);
        res.json({message: 'Save Subcategory'})
    }

    //Elimiar
    public async delete(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        await db.query('DELETE FROM subcategories WHERE id=?', [id]);
        res.json({message: 'Subcategory Delete'})
    }

    //Actualizar
    public async update(req:Request, res:Response):Promise<void> {
        const {id} = req.params;
        await db.query('UPDATE subcategories set ? WHERE id=?', [req.body, id]);
        res.json({message: 'The subcategory update'});
    }

}

export const subcategoriesController = new SubcategoriesController();