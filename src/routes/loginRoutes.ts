import {Router} from "express";
import { loginController } from "../controllers/loginControllers";
import {TokenValidation} from "../Libs/validateToken";

class LoginRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.post('/', loginController.create);
        this.router.get('/verification/:username/:password', loginController.LoginUser);
        this.router.get('/verify', TokenValidation,loginController.profile)
        this.router.get('/verify-email/:email', loginController.verifyEmail)
        this.router.put('/:id',loginController.updateInformation);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;