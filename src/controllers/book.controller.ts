import { BookRepo } from '../repository/book.mongo.repository.js';
import { Controller } from './controller.js';
import { Book } from '../entities/book.js';

import createDebug from 'debug';
const debug = createDebug('W6:BookController');

export class BookController extends Controller<Book> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: BookRepo) {
    super();
    debug('Instantiated');
  }
}
