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
exports.subcategoriesController = void 0;
const database_1 = __importDefault(require("../database"));
class SubcategoriesController {
    //listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subcategories = yield database_1.default.query('SELECT * FROM subcategories');
                res.json(subcategories);
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
                const subcategory = yield database_1.default.query('SELECT * FROM subcategories WHERE id = ?', [id]);
                if (subcategory.length > 0) {
                    return res.json(subcategory[0]);
                }
                res.status(404).json({ text: "The subcategory don't found" });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Filtrador de datos
    filterItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const item = yield database_1.default.query('SELECT * FROM subcategories WHERE name = ?', [name]);
                if (item.length > 0) {
                    return res.json(item[0]);
                }
                else {
                    return res.json({ text: "The item don't found" });
                }
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //filtrador por titulos de categoria
    filterTitleCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const item = yield database_1.default.query('SELECT * FROM subcategories WHERE title_list = ?', [title]);
                res.json(item);
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //filter categories
    filterCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCategory } = req.params;
                const item = yield database_1.default.query('SELECT * FROM subcategories WHERE category = ?', [idCategory]);
                res.json(item);
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
                const item = yield database_1.default.query('SELECT * FROM subcategories WHERE url = ?', [url]);
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
                yield database_1.default.query('INSERT INTO subcategories SET ?', [req.body]);
                res.json({ message: 'Save Subcategory' });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
    //Elimiar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('DELETE FROM subcategories WHERE id=?', [id]);
                res.json({ message: 'Subcategory Delete' });
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
                yield database_1.default.query('UPDATE subcategories set ? WHERE id=?', [req.body, id]);
                res.json({ message: 'The subcategory update' });
            }
            catch (error) {
                console.log('error ', error);
            }
        });
    }
}
exports.subcategoriesController = new SubcategoriesController();
