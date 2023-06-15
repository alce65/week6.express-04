import { User } from './user';

export type Book = {
  id: string;
  author: string;
  title: string;
  owner: User;
};
