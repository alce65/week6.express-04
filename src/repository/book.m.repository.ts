import fs from 'fs/promises';
import createDebug from 'debug';
import { Book } from '../entities/book.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:BookRepo');

const file = './data.json';

const createID = (): Book['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class BookRepo implements Repo<Book> {
  constructor() {
    debug('Instantiated');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Book[];
    return aData;
  }

  async queryById(id: string) {
    const aData = await this.query();
    const result = aData.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(data: Omit<Book, 'id'>) {
    const aData = await this.query();
    const newBook: Book = { ...data, id: createID() };
    const result = JSON.stringify([...aData, newBook]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newBook;
  }

  async update(id: string, data: Partial<Book>) {
    const aData = await this.query();
    let newBook: Book = {} as Book;
    const result = aData.map((item) => {
      if (item.id === id) {
        newBook = { ...item, ...data };
        return newBook;
      }

      return item;
    });

    if (!newBook!.id)
      throw new HttpError(404, 'Not found', 'Bad id for the update');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
    return newBook;
  }

  async delete(id: string) {
    const aData = await this.query();
    const result = aData.filter((item) => item.id !== id);
    if (aData.length === result.length)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
  }
}
