import { UserModel } from './user.mongo.model.js';
import createDebug from 'debug';
import { User } from '../entities/user.js';
import { Repo } from './repo.js';

// TEMP import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:UserRepo');

export class UserRepo implements Partial<Repo<User>> {
  constructor() {
    debug('Instantiated', UserModel);
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }
}
