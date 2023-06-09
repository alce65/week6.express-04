import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { sampleRouter } from './routers/sample.router.js';
const debug = createDebug('W6:App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_req, _res, next) => {
  debug('Soy un middleware');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/sample', sampleRouter);
