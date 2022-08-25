import { Router } from "express";
import { addressController } from "../controllers/addressControllers";

class AddressRoutes {
    router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/:idUser', addressController.filterAddress);
        this.router.post('/', addressController.create)
        this.router.get('/filter/:id', addressController.filterFirstAddress)
        this.router.put('/:id', addressController.update)
        this.router.delete('/:id', addressController.delete)
    }
}

const addressRoutes = new AddressRoutes();
export default addressRoutes.router;