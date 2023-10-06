import  express from 'express';
const app = express();
import run from "./databaseConnection.js";
run();
import usersRouter from './routes/users.js';
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret= process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/cut-citas/users', usersRouter);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

const port = 4000;
app.listen(port, () => {
  //console.log(`Servidor Express escuchando en el puerto ${port}`);
});

export default app;
