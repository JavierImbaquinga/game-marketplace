import {Router} from "express";
import {categoriesController} from "../controllers/categoriesControllers";


class CategoriesRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.get('/', categoriesController.list);
        this.router.get('/:id', categoriesController.listId);
        this.router.get('/link/:url', categoriesController.filterUrl);
        this.router.post('/', categoriesController.create);
        this.router.delete('/:id', categoriesController.delete);
        this.router.put('/:id', categoriesController.update)
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;