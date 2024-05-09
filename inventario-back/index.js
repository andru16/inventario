const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { urlencoded, json } = require('express');
const conexion = require('./db/dbmongo');
require('dotenv').config();

const app = express();
const port = 4000;
const prefix = '/v1';

app.use(urlencoded({ extended: true }));
app.use(json());

// Configuración correcta de CORS
app.use(cors());

// Crear un nuevo enrutador para todas las rutas en routerApi
const reservasRouter = express.Router();
routerApi(reservasRouter);

// Aplicar el prefijo a todas las rutas en el nuevo enrutador
app.use(prefix, reservasRouter);

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
