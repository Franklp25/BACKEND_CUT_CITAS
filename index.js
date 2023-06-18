import  express from 'express';
const app = express();
import run from "./databaseConnection.js";
run();
import usersRouter from './routes/users.js';
import bodyParser from 'body-parser';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use('/cut-citas/user', usersRouter);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
