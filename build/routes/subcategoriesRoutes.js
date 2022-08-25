"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoriesControllers_1 = require("../controllers/subcategoriesControllers");
class SubcategoriesRoustes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', subcategoriesControllers_1.subcategoriesController.list);
        this.router.get('/:id', subcategoriesControllers_1.subcategoriesController.listId);
        this.router.post('/', subcategoriesControllers_1.subcategoriesController.create);
        this.router.delete('/:id', subcategoriesControllers_1.subcategoriesController.delete);
        this.router.put('/:id', subcategoriesControllers_1.subcategoriesController.update);
        this.router.get('/category/:idCategory', subcategoriesControllers_1.subcategoriesController.filterCategory);
        this.router.get('/list/:title', subcategoriesControllers_1.subcategoriesController.filterTitleCategory);
        this.router.get('/link/:url', subcategoriesControllers_1.subcategoriesController.filterUrl);
    }
}
const subcategoriesRoutes = new SubcategoriesRoustes();
exports.default = subcategoriesRoutes.router;
