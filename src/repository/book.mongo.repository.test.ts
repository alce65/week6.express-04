import { Book } from '../entities/book.js';
import { BookModel } from './book.mongo.model.js';
import { BookRepo } from './book.mongo.repository';

jest.mock('./book.mongo.model.js');

// TEMP
// findById: jest.fn(),
// create: jest.fn(),
// findByIdAndUpdate: jest.fn(),
// findByIdAndDelete: jest.fn(),

describe('Given BookRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new BookRepo();

    test('Then method query should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      BookModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await repo.query();
      expect(BookModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    // TEMP test('Then method queryById should be used', async () => {
    //   const mockSample = [{ id: '1' }];
    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockSample)
    //   );
    //   const result = await repo.queryById('1');
    //   expect(fs.readFile).toHaveBeenCalled();
    //   expect(result).toEqual(mockSample[0]);
    // });

    test('Then method create should be used', async () => {
      const mockBook = { author: 'Marco' } as unknown as Book;
      BookModel.create = jest.fn().mockResolvedValue(mockBook);
      const result = await repo.create(mockBook);
      expect(BookModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockBook);
    });
  });
});
