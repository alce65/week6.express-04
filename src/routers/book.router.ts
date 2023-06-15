import { Router as createRouter } from 'express';
import { BookController } from '../controllers/book.controller.js';
import { BookRepo } from '../repository/book.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { Book } from '../entities/book.js';

import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
const debug = createDebug('W6:BookRouter');

debug('Executed');

const repo: Repo<Book> = new BookRepo();
const controller = new BookController(repo);
const auth = new AuthInterceptor();
export const bookRouter = createRouter();

bookRouter.get('/', controller.getAll.bind(controller));
bookRouter.get('/:id', controller.getById.bind(controller));
bookRouter.post('/', auth.logged.bind(auth), controller.post.bind(controller));
bookRouter.patch(
  '/:id',
  auth.logged.bind(auth),
  controller.patch.bind(controller)
);
bookRouter.delete(
  '/:id',
  auth.logged.bind(auth),
  controller.deleteById.bind(controller)
);
