"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesControllers_1 = require("../controllers/categoriesControllers");
class CategoriesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', categoriesControllers_1.categoriesController.list);
        this.router.get('/:id', categoriesControllers_1.categoriesController.listId);
        this.router.get('/link/:url', categoriesControllers_1.categoriesController.filterUrl);
        this.router.post('/', categoriesControllers_1.categoriesController.create);
        this.router.delete('/:id', categoriesControllers_1.categoriesController.delete);
        this.router.put('/:id', categoriesControllers_1.categoriesController.update);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
