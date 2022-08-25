import { Router } from "express";
import {productsControllers} from "../controllers/productsControllers";

class ProductsRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.get('/', productsControllers.list);
        this.router.get('/:id', productsControllers.listId);
        this.router.get('/name/:name', productsControllers.verifyItem);
        this.router.get('/filter/:filtro', productsControllers.filterData);
        this.router.get('/filtro/:data/:url', productsControllers.filterUrlCategory);
        this.router.get('/item/:url', productsControllers.filterUrlItem);
        this.router.get('/multiple/:item/:valor', productsControllers.filterMultipleData);
        this.router.post('/', productsControllers.create);
        this.router.delete('/:id', productsControllers.delete);
        this.router.put('/:id', productsControllers.update)
        this.router.get('/limit/:init/:limite', productsControllers.limit)
        this.router.get('/filter-limit/:item/:valor/:init/:limit', productsControllers.filterLimitData);
    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;