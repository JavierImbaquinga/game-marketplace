import { Request, Response } from "express";
import db from "../database";

class productsController {

    //Listar productos
    public async list(req:Request, res:Response):Promise <void>{
        const products = await db.query('SELECT * FROM products');
        res.json(products)
    }

    //Listar un solo elelemento
    public async listId(req:Request, res:Response):Promise <any> {
        console.log("parametros por id",req.params)
        const {id} = req.params;
        const product = await db.query('SELECT * FROM products WHERE id = ?',[id])
        if(product.length > 0){
            return res.json(product[0])
            
        }
        res.status(404).json({text: "The product don't found id"});
    }

    //Limiar la busqueda
    public async limit(req:Request, res:Response):Promise <any> {
        const {init} = req.params;
        const {limite} = req.params;
        const number = parseInt(limite);
        const initial = parseInt(init);
        const products = await db.query('SELECT * FROM products LIMIT ?,?',[initial,number])
        res.json(products);
    }

    //Verificar si existe el item
    public async verifyItem(req:Request, res:Response):Promise<any> {
        const {name} = req.params;
        const item = await db.query('SELECT * FROM products WHERE name = ?',[name])
        if(item.length > 0){
            return res.json(item[0])
        }else {
            return res.json([])
        }   
    }

    //filtro de informacion para cargar galeria de top 20
    public async filterData(req:Request, res:Response):Promise<any> {
        const {filtro} = req.params;
        const product = await db.query('SELECT * FROM products WHERE name = ?',[filtro])
        res.json(product)
    }

    //filtrador de datos por url Category
    public async filterUrlCategory(req:Request, res:Response):Promise<any> {
        const {data} = req.params;
        const {url} = req.params;
        const product = await db.query('SELECT * FROM products WHERE  '+data+' = ?',[url])
        res.json(product)
    }

    //filtrar por url
    public async filterUrlItem(req:Request, res:Response):Promise<any> {
        const {url} = req.params;
        const item = await db.query('SELECT * FROM products WHERE url=?', [url]);
        res.json(item)

    }

    //filtrar por data y campos
    public async filterMultipleData(req:Request, res:Response):Promise<any> {
        const {item} = req.params;
        const {valor} = req.params;
        const products = await db.query('SELECT * FROM products WHERE '+item+' = ?', [valor])
        res.json(products);
    }

    //filtrador con limitadores
    public async filterLimitData(req:Request, res:Response):Promise<any> {
        const {item} = req.params;
        const {valor} = req.params;
        const {init} = req.params;
        const iniciador = parseInt(init);
        const {limit} = req.params;
        const limitador = parseInt(limit);
        const products = await db.query('SELECT * FROM products WHERE '+item+' = ? LIMIT ?,?',[valor,iniciador, limitador])
        res.json(products)
    }

    //Crear
    public async create(req:Request, res:Response):Promise<void>{
        await db.query('INSERT INTO products SET ? ', [req.body]);
        res.json({message: 'Save Product'})
    }

    //Eliminar
    public async delete(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        await db.query('DELETE FROM products WHERE id=?', [id]);
        res.json({message: 'Product Delete'})
    }

    //Actualizar
    public async update(req:Request, res:Response):Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE products set ? WHERE id=?', [req.body, id]);
        res.json({message: 'The product update'})
    }
    
}

export const productsControllers = new productsController();