import fs from 'fs/promises';
import { SampleRepo } from './sample.repository';

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
