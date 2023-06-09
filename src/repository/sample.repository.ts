import fs from 'fs/promises';
import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');

type User = {
  id: string;
  user: string;
};

const file = './data.json';

export class SampleRepo {
  constructor() {
    debug('Sample Repo');
  }

  async readAll() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(stringData) as User[];
  }
}
