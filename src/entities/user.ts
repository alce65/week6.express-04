import { Book } from './book';

export type User = {
  id: string;
  userName: string;
  email: string;
  passwd: string;
  books: Book[];
};

export type UserLogin = {
  user: string; // Equal to userName or email
  passwd: string;
};
