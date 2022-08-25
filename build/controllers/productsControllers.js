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
exports.productsControllers = void 0;
const database_1 = __importDefault(require("../database"));
class productsController {
    //Listar productos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM products');
            res.json(products);
        });
    }
    //Listar un solo elelemento
    listId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("parametros por id", req.params);
            const { id } = req.params;
            const product = yield database_1.default.query('SELECT * FROM products WHERE id = ?', [id]);
            if (product.length > 0) {
                return res.json(product[0]);
            }
            res.status(404).json({ text: "The product don't found id" });
        });
    }
    //Limiar la busqueda
    limit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { init } = req.params;
            const { limite } = req.params;
            const number = parseInt(limite);
            const initial = parseInt(init);
            const products = yield database_1.default.query('SELECT * FROM products LIMIT ?,?', [initial, number]);
            res.json(products);
        });
    }
    //Verificar si existe el item
    verifyItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const item = yield database_1.default.query('SELECT * FROM products WHERE name = ?', [name]);
            if (item.length > 0) {
                return res.json(item[0]);
            }
            else {
                return res.json([]);
            }
        });
    }
    //filtro de informacion para cargar galeria de top 20
    filterData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filtro } = req.params;
            const product = yield database_1.default.query('SELECT * FROM products WHERE name = ?', [filtro]);
            res.json(product);
        });
    }
    //filtrador de datos por url Category
    filterUrlCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.params;
            const { url } = req.params;
            const product = yield database_1.default.query('SELECT * FROM products WHERE  ' + data + ' = ?', [url]);
            res.json(product);
        });
    }
    //filtrar por url
    filterUrlItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const item = yield database_1.default.query('SELECT * FROM products WHERE url=?', [url]);
            res.json(item);
        });
    }
    //filtrar por data y campos
    filterMultipleData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { item } = req.params;
            const { valor } = req.params;
            const products = yield database_1.default.query('SELECT * FROM products WHERE ' + item + ' = ?', [valor]);
            res.json(products);
        });
    }
    //filtrador con limitadores
    filterLimitData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { item } = req.params;
            const { valor } = req.params;
            const { init } = req.params;
            const iniciador = parseInt(init);
            const { limit } = req.params;
            const limitador = parseInt(limit);
            const products = yield database_1.default.query('SELECT * FROM products WHERE ' + item + ' = ? LIMIT ?,?', [valor, iniciador, limitador]);
            res.json(products);
        });
    }
    //Crear
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO products SET ? ', [req.body]);
            res.json({ message: 'Save Product' });
        });
    }
    //Eliminar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM products WHERE id=?', [id]);
            res.json({ message: 'Product Delete' });
        });
    }
    //Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE products set ? WHERE id=?', [req.body, id]);
            res.json({ message: 'The product update' });
        });
    }
}
exports.productsControllers = new productsController();
