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
exports.loginController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    //listar usuarios
    //crear usuarios
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield database_1.default.query('INSERT INTO users SET ?', [req.body]);
            const token = jsonwebtoken_1.default.sign({ id: newUser.id }, 'yukarin');
            res.json({ token });
        });
    }
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const { password } = req.params;
            const item = yield database_1.default.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password]);
            if (item.length > 0) {
                const token = jsonwebtoken_1.default.sign({ id: item[0]["id"] }, 'yukarin', {
                    expiresIn: 86400
                });
                return res.json({ token });
            }
            else {
                return res.json([]);
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [req.userId]);
            if (profile.length > 0) {
                return res.json(profile[0]);
            }
            else {
                return res.json([]);
            }
        });
    }
    //Actualizar
    updateInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
            return res.json({ message: req.body });
        });
    }
    //Verify Email
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const verify = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
            if (verify.length > 0) {
                return res.json(verify[0]);
            }
            else {
                return res.json([]);
            }
        });
    }
}
exports.loginController = new LoginController();
