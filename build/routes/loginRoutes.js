"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControllers_1 = require("../controllers/loginControllers");
const validateToken_1 = require("../Libs/validateToken");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', loginControllers_1.loginController.create);
        this.router.get('/verification/:username/:password', loginControllers_1.loginController.LoginUser);
        this.router.get('/verify', validateToken_1.TokenValidation, loginControllers_1.loginController.profile);
        this.router.get('/verify-email/:email', loginControllers_1.loginController.verifyEmail);
        this.router.put('/:id', loginControllers_1.loginController.updateInformation);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
