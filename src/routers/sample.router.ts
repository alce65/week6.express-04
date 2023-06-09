import { Router as createRouter } from 'express';
import { SampleController } from '../controllers/sample.controller.js';

const controller = new SampleController();
export const sampleRouter = createRouter();

sampleRouter.get('/', controller.getAll.bind(controller));
sampleRouter.get('/:id', controller.getById.bind(controller));
sampleRouter.post('/', controller.post.bind(controller));
sampleRouter.patch('/:id', controller.patch.bind(controller));
sampleRouter.delete('/:id', controller.deleteById.bind(controller));
