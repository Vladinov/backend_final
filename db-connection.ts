import { Pool } from 'pg';
const connectionString = 'postgres://vladi:AzjacmpfPvGJpNLMSOuDn5tCkqISZFA1@dpg-cn5hv1icn0vc73d6ma4g-a/database_jyrd'

const pool = new Pool({
     connectionString : 'postgres://vladi:AzjacmpfPvGJpNLMSOuDn5tCkqISZFA1@dpg-cn5hv1icn0vc73d6ma4g-a/database_jyrd'

   /* user: 'postgres',
    password: '12345678',
    host: 'localhost',
    port: 5432,
    database: 'PROYECTOFINAL3'*/
});

export function query(text: any): any{
    return pool.query(text);
}