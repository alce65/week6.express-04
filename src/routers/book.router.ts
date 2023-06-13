import { Router as createRouter } from 'express';
import { BookController } from '../controllers/book.controller.js';
import { BookRepo } from '../repository/book.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { Book } from '../entities/book.js';

import createDebug from 'debug';
const debug = createDebug('W6:BookRouter');

debug('Executed');

const repo: Repo<Book> = new BookRepo();
const controller = new BookController(repo);
export const bookRouter = createRouter();

bookRouter.get('/', controller.getAll.bind(controller));
bookRouter.get('/:id', controller.getById.bind(controller));
bookRouter.post('/', controller.post.bind(controller));
bookRouter.patch('/:id', controller.patch.bind(controller));
bookRouter.delete('/:id', controller.deleteById.bind(controller));
