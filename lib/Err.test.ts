import { describe, it, expect } from 'vitest';
import { Err } from './Err';
import { Ok } from './Ok';

describe('Err', () => {
  describe('constructor', () => {
    it('should create an Err instance', () => {
      const errorResult = new Err('Something went wrong');
      expect(errorResult.unwrapError()).toBe('Something went wrong');
    });
  });

  describe('and', () => {
    it('should return the same instance', () => {
      const errorResult = new Err('Something went wrong');
      const anotherResult = new Ok(42);
      const combined = errorResult.and(anotherResult);
      expect(combined.unwrapError()).toBe('Something went wrong');
    });
  });

  describe('andThen', () => {
    it('should return the same instance', () => {
      const errorResult = new Err('Something went wrong');
      const newResult = errorResult.andThen((value) => new Ok(value));
      expect(newResult.unwrapError()).toBe('Something went wrong');
    });
  });

  describe('isOk', () => {
    it('should return false', () => {
      const errorResult = new Err('Something went wrong');
      expect(errorResult.isOk()).toBe(false);
    });
  });

  describe('isError', () => {
    it('should return true', () => {
      const errorResult = new Err('Something went wrong');
      expect(errorResult.isError()).toBe(true);
    });
  });

  describe('map', () => {
    it('should return the same instance', () => {
      const errorResult = new Err('Something went wrong');
      // @ts-expect-error: value is never
      const mappedResult = errorResult.map((value) => value.toString());
      expect(mappedResult.unwrapError()).toBe('Something went wrong');
    });
  });

  describe('mapError', () => {
    it('should apply the function', () => {
      const errorResult = new Err('Something went wrong');
      const newErrorResult = errorResult.mapError((_) => 'New error');
      expect(newErrorResult.unwrapError()).toBe('New error');
    });
  });

  describe('unwrap', () => {
    it('should throw an error', () => {
      const errorResult = new Err('Something went wrong');
      expect(() => errorResult.unwrap()).toThrow('Called unwrap on an Err value');
    });
  });

  describe('unwrapError', () => {
    it('should return the error', () => {
      const errorResult = new Err('Something went wrong');
      expect(errorResult.unwrapError()).toBe('Something went wrong');
    });
  });

  describe('unwrapOr', () => {
    it('should return the default value', () => {
      const errorResult = new Err('Something went wrong');
      expect(errorResult.unwrapOr(42)).toBe(42);
    });
  });
});
