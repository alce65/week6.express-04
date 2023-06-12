import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/http.error.js';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('Error Middleware');

  if (error instanceof HttpError) {
    console.error(error.status, error.statusMessage, error.message);
    res.status(error.status);
    res.statusMessage = error.message;
    res.send({
      status: error.status + ' ' + error.statusMessage,
      error: error.message,
    });
    return;
  }

  console.error(error);
  res.status(500);
  res.send({
    error: error.message,
  });
};
