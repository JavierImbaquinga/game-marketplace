import { Router } from "express";
import { subcategoriesController } from "../controllers/subcategoriesControllers";

class SubcategoriesRoustes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.get('/', subcategoriesController.list);
        this.router.get('/:id', subcategoriesController.listId);
        this.router.post('/', subcategoriesController.create);
        this.router.delete('/:id', subcategoriesController.delete);
        this.router.put('/:id', subcategoriesController.update);
        this.router.get('/category/:idCategory', subcategoriesController.filterCategory)
        this.router.get('/list/:title', subcategoriesController.filterTitleCategory)
        this.router.get('/link/:url', subcategoriesController.filterUrl);
    }
}

const subcategoriesRoutes = new SubcategoriesRoustes();
export default subcategoriesRoutes.router;