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
                while (sum < random) {
                    sum = sum + y[index].probabilidad;
                    index = index + 1;
                    console.log("sum" + sum);
                }
                index = index - 1;
                console.log("index" + index);
                console.log(y[index]);
                res.send(y[index]);
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
app.post('/orders', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, isoString, dateString, fechaActual, año, mes, dia, fechaFormateada, horaActual, horas, minutos, segundos, horaFormateada, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\x1b[44m", "INSERT INTO orders (menu_id,  state) VALUES (" + req.body.menu_id + ", '" + req.body.state + "')");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('\x1b[41m', 'se van a guardar los datos en la base de datos');
                now = new Date();
                isoString = now.toISOString();
                dateString = isoString.substring(0, 10);
                fechaActual = new Date();
                año = fechaActual.getFullYear();
                mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
                dia = ('0' + fechaActual.getDate()).slice(-2);
                fechaFormateada = año + '-' + mes + '-' + dia;
                console.log(fechaFormateada);
                horaActual = new Date();
                horas = ('0' + horaActual.getHours()).slice(-2);
                minutos = ('0' + horaActual.getMinutes()).slice(-2);
                segundos = ('0' + horaActual.getSeconds()).slice(-2);
                horaFormateada = horas + ':' + minutos + ':' + segundos;
                console.log(horaFormateada);
                return [4 /*yield*/, db.query("INSERT INTO orders (menu_id,  state, date, time) VALUES (" + req.body.menu_id + ", '" + req.body.state + "', '" + fechaFormateada + "', '" + horaFormateada + "')")];
            case 2:
                result = _a.sent();
                res.json("Datos guardados correctamente");
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
console.log('\x1b[36m%s\x1b[0m', 'Se enseñaran los menus en la cocina');
app.get('/orders', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('\x1b[41m', 'se mostratran los menus en la cocina');
                return [4 /*yield*/, db.query("SELECT * FROM orders INNER JOIN menus ON orders.menu_id = menus.id ORDER BY state")];
            case 1:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/orders/:menu_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('\x1b[41m', 'Actualizar estado de pedido a "done".');
                return [4 /*yield*/, db.query("UPDATE orders SET state = 'done' WHERE menu_id = " + req.params.menu_id)];
            case 1:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/prueba', function (req, res) {
    res.send('Hello from express and typescript');
});
/*app.get('/chat', (req, res) => {
  res.send('Hello from express and typescript');
});*/
app.get('/chat/:fecha', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fechaActual, año, mes, dia, fechaFormateada, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fechaActual = new Date();
                año = fechaActual.getFullYear();
                mes = fechaActual.getMonth() + 1;
                dia = fechaActual.getDate();
                fechaFormateada = año + "-" + (mes < 10 ? '0' : '') + mes + "-" + (dia < 10 ? '0' : '') + dia;
                console.log('\x1b[36m%s\x1b[0m', "" + JSON.stringify(fechaFormateada));
                console.log("Fecha actual: " + fechaFormateada);
                console.log("SELECT * FROM chat WHERE date = '" + fechaFormateada + "'");
                console.log('\x1b[36m%s\x1b[0m', "" + JSON.stringify(fechaFormateada));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM chat WHERE date = '" + fechaFormateada + "'")];
            case 2:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error(err_5);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/chat', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    // Función para asegurarse de que los números tengan dos dígitos (0 al principio si es necesario)
    function padLeft(num) {
        return num < 10 ? '0' + num : num;
    }
    var fechaActual, año, mes, dia, fechaFormateada, horaActual, horas, minutos, segundos, horaFormateada, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fechaActual = new Date();
                año = fechaActual.getFullYear();
                mes = fechaActual.getMonth() + 1;
                dia = fechaActual.getDate();
                fechaFormateada = año + "-" + (mes < 10 ? '0' : '') + mes + "-" + (dia < 10 ? '0' : '') + dia;
                console.log('\x1b[36m%s\x1b[0m', "" + JSON.stringify(fechaFormateada));
                console.log("Fecha actual: " + fechaFormateada);
                horaActual = new Date();
                horas = fechaActual.getHours();
                minutos = fechaActual.getMinutes();
                segundos = fechaActual.getSeconds();
                horaFormateada = padLeft(horas) + ':' + padLeft(minutos) + ':' + padLeft(segundos);
                console.log(horaFormateada);
                // Imprimir la hora
                console.log(horaFormateada);
                console.log(req.body);
                console.log("INSERT INTO chat ( date, name, message, time ) VALUES ('" + fechaFormateada + "', '" + req.body.name + "', '" + req.body.message + "' , '" + horaFormateada + "')");
                console.log("" + JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('Ejecutando consulta SQL...');
                console.log("" + JSON.stringify("INSERT INTO chat ( date, name, message, time ) VALUES ('" + fechaFormateada + "', '" + req.body.name + "', '" + req.body.message + "' , '" + horaFormateada + "')"));
                return [4 /*yield*/, db.query("INSERT INTO chat  ( date, name, message, time ) VALUES ('" + fechaFormateada + "', '" + req.body.name + "', '" + req.body.message + "', '" + horaFormateada + "')")];
            case 2:
                result = _a.sent();
                console.log('Consulta SQL ejecutada con éxito:');
                res.json("Datos guardados correctamente");
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                console.error('Error al ejecutar la consulta SQL:', err_6);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*app.get('/', (req, res) => {
  res.send('Hello from express and typescript');
});
/*....*/
/*

app.get('/alumnos/:alumno', async (req, res) => {
  console.log("SELECT * FROM alumnos WHERE name = '" + req.params.alumno + "'");
  try {
    const result = await db.query("SELECT * FROM alumnos WHERE name = '" + req.params.alumno + "'");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/alumnos', async (req, res) => {

  console.log(`SELECT * FROM alumnos WHERE name = '${req.query.name}'`);
  try {
    const result = await db.query("SELECT * FROM alumnos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/alumnos', jsonParser, async (req, res) => {
  console.log(req.body)
  console.log(`INSERT INTO alumnos VALUES (${req.body.id}, '${req.body.name}', ${req.body.age})`);
  try {
    const result = await db.query(`INSERT INTO alumnos VALUES (${req.body.id}, '${req.body.name}', ${req.body.age})`);
    console.log(result);
    res.json("Datos guardados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});*/
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
