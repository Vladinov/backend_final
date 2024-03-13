import express from "express";
import cors from 'cors';
import * as db from './db-connection';
import bodyParser from 'body-parser';




var app = express();
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});*/

app.use(cors());



var jsonParser = bodyParser.json();
interface Menu {
  _id: string;
  name: string;
  price: number;
  img: string;
  ingredientes: string[];
}

app.get('/preguntas', (req, res) => {
   console.log(req.params)
   console.log(req.query)
       res.send("SELECT dificultad FROM temas'" + req.params.dificultad + "'");
   });
   
   app.get('/temas', async (req, res) => {
      try {
         const result = await db.query("SELECT * FROM temas " );
         console.log(result.rows);
         let y = result.rows
         let sum = 0
         let index = 0
         let max = 15
         let min = 0
         let random = Math.random() * (max - min) + min;
         console.log("random" + random)

         res.send(random)
      
        
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error')
      }
     });

     app.get('/preguntas/:temas', async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM preguntas WHERE temas = '" + req.params.temas + "'" );
        console.log(JSON.stringify(result.rows));
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   
   
   
   
   app.get('/respuestas/:preguntas', async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM respuestas WHERE preguntas = '" + req.params.preguntas + "'" );
        console.log(JSON.stringify(result.rows));
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   
   
   
   
   app.get('/usuarios1/:user_id', async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'" );
        console.log(JSON.stringify(result.rows[0]));
        res.json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   
   
   
   
   
   
   
   
   app.get('/usuarios3/:user_id/:resultado', async (req, res) => {
      try {
         const result = await db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'" );
         let usuario = result.rows[0];
         console.log('usuario:', usuario);
         console.log('resultado:', req.params.resultado);
         if (usuario) {
             console.log('Usuario encontrado. Nivel actual:', usuario.level);
             usuario.level = parseInt(usuario.level) || 0;
             usuario.level = Number(usuario.level) + Number(req.params.resultado);
             console.log('Nuevo nivel:', usuario.level);
             await db.query(`UPDATE usuarios SET level = ${usuario.level} WHERE id = '${usuario.id}'`);
             res.json(usuario.level);
         } else {
             console.log('Usuario no encontrado.');
             res.status(404).send('Usuario no encontrado');
         }
      } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   
   
   
   
   
   
   
   
   app.get('/usuarios/:usuario', async (req, res) => {
      console.log("ENDPOINT : /usuarios/:usuario")
      console.log("INPUT VALUES" + req.params.usuario)
      let usuario;
   
   
   
   
       //1 buscar el usuario en la tabla usuarios
       try {
         const result = await db.query("SELECT * FROM usuarios WHERE id ='" + req.params.usuario + "'");
         console.log(JSON.stringify(result.rows))
         usuario = result.rows;
        // res.json(result.rows);
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error. Error al recuperar usuario de la base e datos')
      }
   
   
   
   
      if(usuario.length > 0){
   //el usuario existe
   res.json({user: usuario [0], created: false});
      } else{
   //el usuari res.json({user: result, created: true});o no existe
   try {
      const result = await db.query(`INSERT INTO usuarios (id, level) VALUES ( '${req.params.usuario}', 0) `);
      console.log(result)
      res.json({user: {id:req.params.usuario, level: 0}, created: true});
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error. Error alcrear usuario.')
   }
      }
   });
   
   
   app.get('/usuarios1/:user_id', async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM usuarios WHERE id ='" + req.params.user_id + "'" );
        console.log(JSON.stringify(result.rows[0]));
        res.json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   
   
   
   
   app.get('/prueba', async (req, res) => {
      try {
      console.log("prueba")
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error. Error al recuperar usuario de base de datos');
      }
   });
   


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));