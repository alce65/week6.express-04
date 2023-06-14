import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';

import createDebug from 'debug';
import { AuthServices } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.user || !req.body.passwd) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (1)');
      }

      let data = await this.repo.search({
        key: 'userName',
        value: req.body.user,
      });
      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: req.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (2)');
      }

      const isUserValid = await AuthServices.compare(
        req.body.passwd,
        data[0].passwd
      );

      if (!isUserValid) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (3)');
      }

      res.send(data[0]);
    } catch (error) {
      next(error);
    }
  }
}
