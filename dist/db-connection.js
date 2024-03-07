"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    connectionString: 'postgres://vladi:AzjacmpfPvGJpNLMSOuDn5tCkqISZFA1@dpg-cn5hv1icn0vc73d6ma4g-a/database_jyrd'
    /* user: 'postgres',
     password: '12345678',
     host: 'localhost',
     port: 5432,
     database: 'PROYECTOFINAL3'*/
});
function query(text) {
    return pool.query(text);
}
exports.query = query;
