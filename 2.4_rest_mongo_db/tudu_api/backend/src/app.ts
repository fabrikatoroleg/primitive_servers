import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import todoRouter from './routes/todoRoutes';

const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/api/v1', todoRouter);

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});