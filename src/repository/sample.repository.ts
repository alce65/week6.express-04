import fs from 'fs/promises';
import { Sample } from '../entities/sample.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';

import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');

const file = './data.json';

const createID = (): Sample['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class SampleRepo implements Omit<Repo<Sample>, 'search'> {
  constructor() {
    debug('Instantiated');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Sample[];
    return aData;
  }

  async queryById(id: string) {
    const aData = await this.query();
    const result = aData.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(data: Omit<Sample, 'id'>) {
    const aData = await this.query();
    const newSample: Sample = { ...data, id: createID() };
    const result = JSON.stringify([...aData, newSample]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newSample;
  }

  async update(id: string, data: Partial<Sample>) {
    const aData = await this.query();
    let newSample: Sample = {} as Sample;
    const result = aData.map((item) => {
      if (item.id === id) {
        newSample = { ...item, ...data };
        return newSample;
      }

      return item;
    });

    if (!newSample!.id)
      throw new HttpError(404, 'Not found', 'Bad id for the update');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
    return newSample;
  }

  async delete(id: string) {
    const aData = await this.query();
    const result = aData.filter((item) => item.id !== id);
    if (aData.length === result.length)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
  }
}
