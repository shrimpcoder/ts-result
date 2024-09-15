import { describe, it, expect } from 'vitest';
import { Result } from './Result';

describe('Result', () => {
  describe('run', () => {
    it('should return Ok if the function succeeds', () => {
      const result = Result.run(() => 'Success');
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe('Success');
    });

    it('should return Err if the function fails', () => {
      const result = Result.run(() => {
        throw new Error('Failure');
      });
      expect(result.isError()).toBe(true);
      expect(result.unwrapError().message).toBe('Failure');
    });
  });

  describe('runAsync', () => {
    it('should return Ok if the async function succeeds', async () => {
      const result = await Result.runAsync(async () => 'Success');
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe('Success');
    });

    it('should return Err if the async function fails', async () => {
      const result = await Result.runAsync(async () => {
        throw new Error('Failure');
      });
      expect(result.isError()).toBe(true);
      expect(result.unwrapError().message).toBe('Failure');
    });
  });
});
