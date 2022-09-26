"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsControllers_1 = require("../controllers/productsControllers");
const multer_1 = __importDefault(require("../Libs/multer"));
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productsControllers_1.productsControllers.list);
        this.router.get('/:id', productsControllers_1.productsControllers.listId);
        this.router.get('/name/:name', productsControllers_1.productsControllers.verifyItem);
        this.router.get('/filter/:filtro', productsControllers_1.productsControllers.filterData);
        this.router.get('/filtro/:data/:url', productsControllers_1.productsControllers.filterUrlCategory);
        this.router.get('/item/:url', productsControllers_1.productsControllers.filterUrlItem);
        this.router.get('/multiple/:item/:valor', productsControllers_1.productsControllers.filterMultipleData);
        // this.router.post('/', productsControllers.create);
        this.router.post('/', productsControllers_1.productsControllers.create);
        this.router.post('/upload', multer_1.default.single('image'), productsControllers_1.productsControllers.uploadImage);
        this.router.delete('/:id', productsControllers_1.productsControllers.delete);
        this.router.put('/:id', productsControllers_1.productsControllers.update);
        this.router.get('/limit/:init/:limite', productsControllers_1.productsControllers.limit);
        this.router.get('/filter-limit/:item/:valor/:init/:limit', productsControllers_1.productsControllers.filterLimitData);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
