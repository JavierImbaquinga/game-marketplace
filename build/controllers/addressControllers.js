"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressController = void 0;
const database_1 = __importDefault(require("../database"));
class AddressController {
    //Crear address
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO address SET ?', [req.body]);
            res.json({ message: 'Save Address' });
        });
    }
    //Filtrador de address
    filterAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const item = yield database_1.default.query('SELECT * FROM address where id_User = ?', [idUser]);
            res.json(item);
        });
    }
    //filter fir5st address
    filterFirstAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield database_1.default.query('SELECT * FROM address where id = ?', [id]);
            res.json(item[0]);
        });
    }
    //edit address
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE address SET ? Where id=?', [req.body, id]);
            res.json({ message: 'The address update' });
        });
    }
    //delete address
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM address WHERE id= ?', [id]);
            res.json({ message: 'Address Delete.' });
        });
    }
}
exports.addressController = new AddressController();
