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
         while(sum < random) {
           sum = sum + y[index].probabilidad
           index = index + 1
           console.log("sum" + sum)
     
     
     
     
         }
         index = index - 1
         console.log("index" + index)
         console.log(y[index] )
         res.send(y[index])
        
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error')
      }
     });

     
app.post('/orders', jsonParser, async (req, res) => {
  console.log("\x1b[44m", `INSERT INTO orders (menu_id,  state) VALUES (${req.body.menu_id}, '${req.body.state}')`);
  try {
    console.log('\x1b[41m', 'se van a guardar los datos en la base de datos');
    let now = new Date();
    let isoString = now.toISOString();
    let dateString = isoString.substring(0, 10);
  
 var fechaActual = new Date();

 var año = fechaActual.getFullYear();
 var mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); 
 var dia = ('0' + fechaActual.getDate()).slice(-2);

 var fechaFormateada = año + '-' + mes + '-' + dia;
 console.log(fechaFormateada);


var horaActual = new Date();

var horas = ('0' + horaActual.getHours()).slice(-2);
var minutos = ('0' + horaActual.getMinutes()).slice(-2);
var segundos = ('0' + horaActual.getSeconds()).slice(-2);

var horaFormateada = horas + ':' + minutos + ':' + segundos;
console.log(horaFormateada);

    const result = await db.query(`INSERT INTO orders (menu_id,  state, date, time) VALUES (${req.body.menu_id}, '${req.body.state}', '${fechaFormateada}', '${horaFormateada}')`);
    res.json("Datos guardados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

console.log('\x1b[36m%s\x1b[0m', 'Se enseñaran los menus en la cocina'); 
app.get('/orders', async(req, res) => {
  try {
    console.log('\x1b[41m', 'se mostratran los menus en la cocina');
    const result = await db.query("SELECT * FROM orders INNER JOIN menus ON orders.menu_id = menus.id ORDER BY state");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/orders/:menu_id', async(req, res) => {
  try {
    console.log('\x1b[41m', 'Actualizar estado de pedido a "done".');
    const result = await db.query(`UPDATE orders SET state = 'done' WHERE menu_id = ${req.params.menu_id}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/prueba', (req, res) => {
  res.send('Hello from express and typescript');
});
/*app.get('/chat', (req, res) => {
  res.send('Hello from express and typescript');
});*/

app.get('/chat/:fecha', async (req, res) => {
  const fechaActual: Date = new Date();

  // Obtener el año, mes y día
  const año: number = fechaActual.getFullYear();
  const mes: number = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
  const dia: number = fechaActual.getDate();
  
  // Formatear la fecha como "YYYY-MM-DD"
  const fechaFormateada: string = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
  console.log('\x1b[36m%s\x1b[0m',`${JSON.stringify(fechaFormateada)}`)
  console.log(`Fecha actual: ${fechaFormateada}`);
  
  console.log("SELECT * FROM chat WHERE date = '" + fechaFormateada + "'");
  console.log('\x1b[36m%s\x1b[0m',`${JSON.stringify(fechaFormateada)}`);
  try {
    const result = await db.query("SELECT * FROM chat WHERE date = '" + fechaFormateada + "'");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/chat', jsonParser, async (req, res) => {
  const fechaActual: Date = new Date();

  // Obtener el año, mes y día
  const año: number = fechaActual.getFullYear();
  const mes: number = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
  const dia: number = fechaActual.getDate();
   // Formatear la fecha como "YYYY-MM-DD"
   const fechaFormateada: string = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
   console.log('\x1b[36m%s\x1b[0m',`${JSON.stringify(fechaFormateada)}`)
   console.log(`Fecha actual: ${fechaFormateada}`);
   const horaActual = new Date();
  //hola
   // Obtener la hora, los minutos y los segundos
   const horas = fechaActual.getHours();
   const minutos = fechaActual.getMinutes();
   const segundos = fechaActual.getSeconds();
   
   // Formatear la hora como una cadena (opcional)
   const horaFormateada = padLeft(horas) + ':' + padLeft(minutos) + ':' + padLeft(segundos);

   console.log(horaFormateada);

// Función para asegurarse de que los números tengan dos dígitos (0 al principio si es necesario)
function padLeft(num: number) {
    return num < 10 ? '0' + num : num;
}
   
   // Imprimir la hora
   console.log(horaFormateada);
  console.log(req.body)
  console.log(`INSERT INTO chat ( date, name, message, time ) VALUES ('${fechaFormateada}', '${req.body.name}', '${req.body.message}' , '${horaFormateada}')`);
  console.log(`${JSON.stringify(req.body)}`);

  
  try {
    console.log('Ejecutando consulta SQL...');
    console.log (`${JSON.stringify(`INSERT INTO chat ( date, name, message, time ) VALUES ('${fechaFormateada}', '${req.body.name}', '${req.body.message}' , '${horaFormateada}')`)}`);
    const result = await db.query(`INSERT INTO chat  ( date, name, message, time ) VALUES ('${fechaFormateada}', '${req.body.name}', '${req.body.message}', '${horaFormateada}')`);

      console.log('Consulta SQL ejecutada con éxito:');
    res.json("Datos guardados correctamente");
  } catch (err) {
    console.error('Error al ejecutar la consulta SQL:', err);
    res.status(500).send('Internal Server Error');
  }
});
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));