import { calculateTotalPages } from '../calculateTotalPages';
describe('calculateTotalPages', () => {
    it('returns 0 when totalItems is 0', () => {
      const result = calculateTotalPages(0, 10);
      expect(result).toBe(0);
    });
  
    it('returns 1 when totalItems is less than or equal to itemsPerPage', () => {
      const result1 = calculateTotalPages(10, 10);
      const result2 = calculateTotalPages(5, 10);
      expect(result1).toBe(1);
      expect(result2).toBe(1);
    });
  
    it('returns the correct number of pages when totalItems is greater than itemsPerPage', () => {
      const result1 = calculateTotalPages(20, 10);
      const result2 = calculateTotalPages(15, 5);
      expect(result1).toBe(2);
      expect(result2).toBe(3);
    });
  
    it('returns the correct number of pages when totalItems is not divisible by itemsPerPage', () => {
      const result = calculateTotalPages(17, 5);
      expect(result).toBe(4);
    });
  });
  