"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressControllers_1 = require("../controllers/addressControllers");
class AddressRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idUser', addressControllers_1.addressController.filterAddress);
        this.router.post('/', addressControllers_1.addressController.create);
        this.router.get('/filter/:id', addressControllers_1.addressController.filterFirstAddress);
        this.router.put('/:id', addressControllers_1.addressController.update);
        this.router.delete('/:id', addressControllers_1.addressController.delete);
    }
}
const addressRoutes = new AddressRoutes();
exports.default = addressRoutes.router;
