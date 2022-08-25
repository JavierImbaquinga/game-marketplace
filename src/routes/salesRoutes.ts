import {Router} from "express";
import { salesController } from "../controllers/salesControllers";

class SalesRoutes {
    router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/', salesController.list);
    }
}

const salesRoutes = new SalesRoutes();
export default salesRoutes.router;