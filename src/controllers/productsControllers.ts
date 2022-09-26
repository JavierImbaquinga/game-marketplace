import { Request, Response } from "express";
import db from "../database";

class productsController {

    //Listar productos
    public async list(req:Request, res:Response):Promise <void>{

        try {
            const products = await db.query('SELECT * FROM products');
            res.json(products)
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //Listar un solo elelemento
    public async listId(req:Request, res:Response):Promise <any> {
        try {
            console.log("parametros por id",req.params)
            const {id} = req.params;
            const product = await db.query('SELECT * FROM products WHERE id = ?',[id])
            if(product.length > 0){
                return res.json(product[0])
                
            }
            res.status(404).json({text: "The product don't found id"});
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //Limiar la busqueda
    public async limit(req:Request, res:Response):Promise <any> {
        try {
            const {init} = req.params;
            const {limite} = req.params;
            const number = parseInt(limite);
            const initial = parseInt(init);
            const products = await db.query('SELECT * FROM products LIMIT ?,?',[initial,number])
            res.json(products);
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //Verificar si existe el item
    public async verifyItem(req:Request, res:Response):Promise<any> {
        try {
            const {name} = req.params;
            const item = await db.query('SELECT * FROM products WHERE name = ?',[name])
            if(item.length > 0){
                return res.json(item[0])
            }else {
                return res.json([])
            } 
        }catch(error){
            console.log('error ', error);
        }

          
    }

    //filtro de informacion para cargar galeria de top 20
    public async filterData(req:Request, res:Response):Promise<any> {
        try {
            const {filtro} = req.params;
            const product = await db.query('SELECT * FROM products WHERE name = ?',[filtro])
            res.json(product)
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //filtrador de datos por url Category
    public async filterUrlCategory(req:Request, res:Response):Promise<any> {
        try {
            const {data} = req.params;
            const {url} = req.params;
            const product = await db.query('SELECT * FROM products WHERE  '+data+' = ?',[url])
            res.json(product)
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //filtrar por url
    public async filterUrlItem(req:Request, res:Response):Promise<any> {
        try {
            const {url} = req.params;
            const item = await db.query('SELECT * FROM products WHERE url=?', [url]);
            res.json(item)
        }catch(error){
            console.log('error ', error);
        }

        

    }

    //filtrar por data y campos
    public async filterMultipleData(req:Request, res:Response):Promise<any> {
        try {
            const {item} = req.params;
            const {valor} = req.params;
            const products = await db.query('SELECT * FROM products WHERE '+item+' = ?', [valor])
            res.json(products);
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //filtrador con limitadores
    public async filterLimitData(req:Request, res:Response):Promise<any> {
        try {
            const {item} = req.params;
            const {valor} = req.params;
            const {init} = req.params;
            const iniciador = parseInt(init);
            const {limit} = req.params;
            const limitador = parseInt(limit);
            const products = await db.query('SELECT * FROM products WHERE '+item+' = ? LIMIT ?,?',[valor,iniciador, limitador])
            res.json(products)
        }catch(error){
            console.log('error ', error);
        }

       
    }

    //Crear
    public async create(req:Request, res:Response):Promise<void>{
        console.log(req.body)
        try {
            await db.query('INSERT INTO products SET ? ', [req.body]);
            res.json({message: 'Save Product'})
        }catch(error){
            console.log('error ', error);
        }

        
    }

    
    //Upload File
    public async uploadImage(req:Request, res:Response):Promise<void> {
        try {
            let url = req.file?.path;
            res.json(url)
        }catch(error){
            console.log('error', error)
        }
    }

    //Eliminar
    public async delete(req:Request, res:Response):Promise<any> {
        try {
            const {id} = req.params;
            await db.query('DELETE FROM products WHERE id=?', [id]);
            res.json({message: 'Product Delete'})
        }catch(error){
            console.log('error ', error);
        }

        
    }

    //Actualizar
    public async update(req:Request, res:Response):Promise<void>{
        try {
            const {id} = req.params;
            await db.query('UPDATE products set ? WHERE id=?', [req.body, id]);
            res.json({message: 'The product update'})
        }catch(error){
            console.log('error ', error);
        }

        
    }
    
}

export const productsControllers = new productsController();