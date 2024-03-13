"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db = __importStar(require("./db-connection"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});*/
app.use(cors_1.default());
var jsonParser = body_parser_1.default.json();
app.get('/preguntas', function (req, res) {
    console.log(req.params);
    console.log(req.query);
    res.send("SELECT dificultad FROM temas'" + req.params.dificultad + "'");
});
app.get('/temas', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, y, sum, index, max, min, random, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query("SELECT * FROM temas ")];
            case 1:
                result = _a.sent();
                console.log(result.rows);
                y = result.rows;
                sum = 0;
                index = 0;
                max = 15;
                min = 0;
                random = Math.random() * (max - min) + min;
                console.log("random" + random);
                res.send(random);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/preguntas/:temas', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query("SELECT * FROM preguntas WHERE temas = '" + req.params.temas + "'")];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result.rows));
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/respuestas/:preguntas', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query("SELECT * FROM respuestas WHERE preguntas = '" + req.params.preguntas + "'")];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result.rows));
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/usuarios1/:user_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'")];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result.rows[0]));
                res.json(result.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/usuarios3/:user_id/:resultado', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, usuario, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'")];
            case 1:
                result = _a.sent();
                usuario = result.rows[0];
                console.log('usuario:', usuario);
                console.log('resultado:', req.params.resultado);
                if (!usuario) return [3 /*break*/, 3];
                console.log('Usuario encontrado. Nivel actual:', usuario.level);
                usuario.level = parseInt(usuario.level) || 0;
                usuario.level = Number(usuario.level) + Number(req.params.resultado);
                console.log('Nuevo nivel:', usuario.level);
                return [4 /*yield*/, db.query("UPDATE usuarios SET level = " + usuario.level + " WHERE id = '" + usuario.id + "'")];
            case 2:
                _a.sent();
                res.json(usuario.level);
                return [3 /*break*/, 4];
            case 3:
                console.log('Usuario no encontrado.');
                res.status(404).send('Usuario no encontrado');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_5 = _a.sent();
                console.error('Error:', err_5);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/usuarios/:usuario', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, result, err_6, result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("ENDPOINT : /usuarios/:usuario");
                console.log("INPUT VALUES" + req.params.usuario);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM usuarios WHERE id ='" + req.params.usuario + "'")];
            case 2:
                result = _a.sent();
                console.log(JSON.stringify(result.rows));
                usuario = result.rows;
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                console.error(err_6);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de la base e datos');
                return [3 /*break*/, 4];
            case 4:
                if (!(usuario.length > 0)) return [3 /*break*/, 5];
                //el usuario existe
                res.json({ user: usuario[0], created: false });
                return [3 /*break*/, 8];
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, db.query("INSERT INTO usuarios (id, level) VALUES ( '" + req.params.usuario + "', 0) ")];
            case 6:
                result = _a.sent();
                console.log(result);
                res.json({ user: { id: req.params.usuario, level: 0 }, created: true });
                return [3 /*break*/, 8];
            case 7:
                err_7 = _a.sent();
                console.error(err_7);
                res.status(500).send('Internal Server Error. Error alcrear usuario.');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.get('/usuarios1/:user_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'")];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result.rows[0]));
                res.json(result.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.error(err_8);
                res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/prueba', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log("prueba");
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
        }
        return [2 /*return*/];
    });
}); });
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
