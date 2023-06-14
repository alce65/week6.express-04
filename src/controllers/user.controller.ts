import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';

import createDebug from 'debug';
import { AuthServices } from '../services/auth.js';
const debug = createDebug('W6:UserController');

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserRepo) {
    debug('Instantiated');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const passwd = await AuthServices.hash(req.body.passwd);
      req.body.passwd = passwd;
      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
