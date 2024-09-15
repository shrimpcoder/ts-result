import { describe, it, expect } from 'vitest';
import { Ok } from './Ok';

describe('Ok', () => {
  describe('constructor', () => {
    it('should create an Ok instance', () => {
      const result = new Ok(42);
      expect(result.unwrap()).toBe(42);
    });
  });

  describe('and', () => {
    it('should return the passed Result', () => {
      const result1 = new Ok(42);
      const result2 = new Ok('hello');
      const combined = result1.and(result2);
      expect(combined.unwrap()).toBe('hello');
    });
  });

  describe('andThen', () => {
    it('should apply the function', () => {
      const result = new Ok(42);
      const newResult = result.andThen((value) => new Ok(value + 1));
      expect(newResult.unwrap()).toBe(43);
    });
  });

  describe('isOk', () => {
    it('should return true', () => {
      const result = new Ok(42);
      expect(result.isOk()).toBe(true);
    });
  });

  describe('isError', () => {
    it('should return false', () => {
      const result = new Ok(42);
      expect(result.isError()).toBe(false);
    });
  });

  describe('map', () => {
    it('should apply the function', () => {
      const result = new Ok(42);
      const mappedResult = result.map((value) => value.toString());
      expect(mappedResult.unwrap()).toBe('42');
    });
  });

  describe('mapError', () => {
    it('should return the same instance', () => {
      const result = new Ok(42);
      const mappedErrorResult = result.mapError((_) => 'new error');
      expect(mappedErrorResult.unwrap()).toBe(42);
    });
  });

  describe('unwrap', () => {
    it('should return the value', () => {
      const result = new Ok(42);
      expect(result.unwrap()).toBe(42);
    });
  });

  describe('unwrapError', () => {
    it('should throw an error', () => {
      const result = new Ok(42);
      expect(() => result.unwrapError()).toThrow('Called unwrapError on an Ok value');
    });
  });

  describe('unwrapOr', () => {
    it('should return the value', () => {
      const result = new Ok(42);
      expect(result.unwrapOr(0)).toBe(42);
    });
  });
});
