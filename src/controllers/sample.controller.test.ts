import { NextFunction, Request, Response } from 'express';
import { SampleRepo } from '../repository/sample.repository';
import { SampleController } from './sample.controller';

describe('Given SampleController class', () => {
  describe('When it is instantiated', () => {
    const mockRepo: SampleRepo = {
      query: jest.fn(),
      queryById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const req = {
      params: { id: 1 },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new SampleController(mockRepo);
    test('Then method getAll should be used', async () => {
      await controller.getAll(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.query).toHaveBeenCalled();
    });

    test('Then method getByID should be used', async () => {
      await controller.getById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.queryById).toHaveBeenCalled();
    });
  });
});
