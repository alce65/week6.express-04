import fs from 'fs/promises';
import { SampleRepo } from './sample.repository';
import { HttpError } from '../types/http.error';

jest.mock('fs/promises');

describe('Given SampleRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new SampleRepo();

    test('Then method query should be used', async () => {
      (fs.readFile as jest.Mock).mockResolvedValueOnce('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then method queryById should be used', async () => {
      const mockSample = [{ id: '1' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockSample)
      );
      const result = await repo.queryById('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockSample[0]);
    });
  });
});

describe('When it is instantiated and delete method is called but the id is not found', () => {
  const repo = new SampleRepo();
  test('Then it should throw an error', async () => {
    const mockId = '5';
    const mockThings = [{ id: '1', data: '' }];

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockThings));

    // TEMP try {
    //   await repo.delete(mockId);
    // } catch (error) {
    //   expect(error as HttpError).toBeInstanceOf(HttpError);
    //   expect((error as HttpError).message).toBe('Bad id for the delete');
    // }

    await expect(repo.delete(mockId)).rejects.toThrowError(HttpError);
  });
});
