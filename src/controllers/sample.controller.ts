import { SampleRepo } from '../repository/sample.repository.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { Sample } from '../entities/sample.js';
const debug = createDebug('W6:SampleController');

export class SampleController extends Controller<Sample> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: SampleRepo) {
    super();
    debug('Instantiated');
  }
}
