import { Router as createRouter } from 'express';
import { SampleController } from '../controllers/sample.controller.js';
import { SampleRepo } from '../repository/sample.repository.js';
import { Repo } from '../repository/repo.js';
import { Sample } from '../entities/sample.js';

import createDebug from 'debug';
const debug = createDebug('W6:SampleRouter');

debug('Executed');
const repo: Repo<Sample> = new SampleRepo() as Repo<Sample>;
const controller = new SampleController(repo);
export const sampleRouter = createRouter();

sampleRouter.get('/', controller.getAll.bind(controller));
sampleRouter.get('/:id', controller.getById.bind(controller));
sampleRouter.post('/', controller.post.bind(controller));
sampleRouter.patch('/:id', controller.patch.bind(controller));
sampleRouter.delete('/:id', controller.deleteById.bind(controller));
