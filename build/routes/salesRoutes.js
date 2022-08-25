"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesControllers_1 = require("../controllers/salesControllers");
class SalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', salesControllers_1.salesController.list);
    }
}
const salesRoutes = new SalesRoutes();
exports.default = salesRoutes.router;
