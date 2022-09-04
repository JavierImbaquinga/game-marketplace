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
exports.categoriesController = void 0;
const database_1 = __importDefault(require("../database"));
class CategoriesController {
    //Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield database_1.default.query('SELECT * FROM categories');
                res.json(categories);
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Listar un solo elemento
    listId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield database_1.default.query('SELECT * FROM categories WHERE id = ?', [id]);
                if (category.length > 0) {
                    return res.json(category[0]);
                }
                res.status(404).json({ text: "The category don't found" });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //filtrador de datos
    filterItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const item = yield database_1.default.query('SELECT * FROM categories WHERE name = ?', [name]);
                if (item.length > 0) {
                    return res.json(item[0]);
                }
                else {
                    return res.json([]);
                }
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //filtrador por url
    filterUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.params;
                const item = yield database_1.default.query('SELECT * FROM categories WHERE url = ?', [url]);
                res.json(item);
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Crear
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO categories SET ?', [req.body]);
                res.json({ message: 'Save Categories' });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Eliminar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('DELETE FROM categories WHERE id= ?', [id]);
                res.json({ message: 'Category Delete' });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('UPDATE categories set ? WHERE id= ?', [req.body, id]);
                res.json({ message: 'The category update' });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
}
exports.categoriesController = new CategoriesController();
