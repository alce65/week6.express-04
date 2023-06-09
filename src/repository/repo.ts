/* eslint-disable no-unused-vars */
export interface Controller<T extends { id: string | number }> {
  getAll: () => T[];
  getById: (id: T['id']) => T;
  post: (data: T) => T;
  patch: (id: T['id'], data: Partial<T>) => T;
  delete: (id: T['id']) => void;
}
