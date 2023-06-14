import { BookModel } from './book.mongo.model.js';
import createDebug from 'debug';
import { Book } from '../entities/book.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:BookRepo');

export class BookRepo implements Repo<Book> {
  constructor() {
    debug('Instantiated');
  }

  async query(): Promise<Book[]> {
    const aData = await BookModel.find().exec();
    return aData;
  }

  async queryById(id: string): Promise<Book> {
    const result = await BookModel.findById(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Book[]> {
    const result = await BookModel.find({ [key]: value }).exec();
    return result;
  }

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    const newBook = await BookModel.create(data);
    return newBook;
  }

  async update(id: string, data: Partial<Book>): Promise<Book> {
    const newBook = await BookModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newBook === null)
      throw new HttpError(404, 'Not found', 'Bad id for the update');
    return newBook;
  }

  async delete(id: string): Promise<void> {
    const result = await BookModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
