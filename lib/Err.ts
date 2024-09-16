import { Ok } from './Ok';
import { Result, IResult } from './Result';

/**
 * Err is a type that represents an error result.
 */
export class Err<E> implements IResult<unknown, E> {
  #error: E;

  /**
   * Creates an Err.
   * @param {E} error - The error to be wrapped.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * ```
   */
  constructor(error: E) {
    this.#error = error;
  }

  /**
   * Returns a Result.
   * If this Result is an Err, the function returns this Result.
   * @param {Result<U, E2>} _ - The Result to be ignored as this Result is an Err.
   * @returns {Result<never, E>} This Result as it is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * const anotherResult = new Ok(42);
   * const combined = errorResult.and(anotherResult); // combined is errorResult
   * ```
   */
  and<U, E2>(_: Result<U, E2>): Result<never, E> {
    return this;
  }

  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * If this Result is an Err, the function is not applied and the error is returned.
   * @param {function(value: never): Result<U, E2>} _ - The function to be ignored as this Result is an Err.
   * @returns {Result<never, E>} This Result as it is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * const newResult = errorResult.andThen(value => new Ok(value)); // newResult is errorResult
   * ```
   */
  andThen<U, E2>(_: (value: never) => Result<U, E2>): Result<never, E> {
    return this;
  }

  /**
   * Returns true if this Result is an Err, false otherwise.
   * @returns {boolean} true if this Result is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * console.log(errorResult.isOk()); // false
   * ```
   */
  isOk(): this is Ok<unknown> {
    return false;
  }

  /**
   * Returns true if this Result is an Err, false otherwise.
   * @returns {boolean} true if this Result is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * console.log(errorResult.isError()); // true
   * ```
   */
  isError(): this is Err<E> {
    return true;
  }

  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * If this Result is an Err, the function is not applied and the error is returned.
   * @param {function(value: never): U} _ - The function to be ignored as this Result is an Err.
   * @returns {Result<never, E>} This Result as it is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * const mappedResult = errorResult.map(value => value.toString()); // mappedResult is errorResult
   * ```
   */
  map<U>(_: (value: never) => U): Result<U, E> {
    return this;
  }

  /**
   * Returns a new Result that is the result of applying the given function to the error of this Result.
   * If this Result is an Err, the function is applied to the error.
   * @param {function(error: E): E2} fn - The function to be applied to the error of this Result.
   * @returns {Result<never, E2>} A Result that is the result of applying the given function to the error of this Result.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * const newErrorResult = errorResult.mapError(error => 'New error'); // newErrorResult is Err('New error')
   * ```
   */
  mapError<E2>(fn: (error: E) => E2): Result<never, E2> {
    return new Err(fn(this.#error));
  }

  /**
   * Throws an error as this Result is an Err.
   * @throws {Error} Always throws an error as this Result is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * errorResult.unwrap(); // throws Error
   * ```
   */
  unwrap(): never {
    throw new Error('Called unwrap on an Err value');
  }

  /**
   * Returns the error of this Result.
   * @returns {E} The error of this Result.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * console.log(errorResult.unwrapError()); // 'Something went wrong'
   * ```
   */
  unwrapError(): E {
    return this.#error;
  }

  /**
   * Returns the default value as this Result is an Err.
   * @param {T} defaultValue - The value to be returned if this Result is an Err.
   * @returns {T} The default value as this Result is an Err.
   * @example
   * ```ts
   * const errorResult = new Err('Something went wrong');
   * console.log(errorResult.unwrapOr(42)); // 42
   * ```
   */
  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }
}
