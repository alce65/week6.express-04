import { hash, compare } from 'bcrypt';

export class AuthServices {
  private static salt = 10;

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
