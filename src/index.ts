import http from 'http';
import { app } from './app.js';
import * as dotenv from 'dotenv';
import createDebug from 'debug';
const debug = createDebug('W6');

dotenv.config();
const PORT = process.env.PORT || 4444;

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
  debug('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
