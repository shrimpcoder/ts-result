import { Err } from './Err';
import { Result } from './Result';

/**
 * Ok is a type that represents a successful result.
 */
export class Ok<T> implements Result<T, never> {
  #value: T;

  /**
   * Creates an Ok.
   * @param {T} value - The value to be wrapped.
   * @example
   * ```ts
   * const result = new Ok(42);
   * ```
   */
  constructor(value: T) {
    this.#value = value;
  }

  /**
   * Returns a Result.
   * If this Result is an Ok, the function returns passed Result.
   * @param {Result<U, E>} res - The Result to be returned.
   * @returns {Result<U, E>} A Result that is the result of applying the given function to the value of this Result.
   * @example
   * ```ts
   * const result1 = new Ok(42);
   * const result2 = new Ok('hello');
   * const combined = result1.and(result2); // combined is result2
   * ```
   */
  and<U, E>(res: Result<U, E>): Result<U, E> {
    return res;
  }

  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * @param {function(value: T): Result<U, E2>} fn - The function to be applied to the value of this Result.
   * @returns {Result<U, E2>} A Result that is the result of applying the given function to the value of this Result.
   * @example
   * ```ts
   * const result = new Ok(42);
   * const newResult = result.andThen(value => new Ok(value + 1)); // newResult is Ok(43)
   * ```
   */
  andThen<U, E2>(fn: (value: T) => Result<U, E2>): Result<U, E2> {
    return fn(this.#value);
  }

  /**
   * Returns true if this Result is an Ok, false otherwise.
   * @returns {boolean} true if this Result is an Ok, false otherwise.
   * @example
   * ```ts
   * const result = new Ok(42);
   * console.log(result.isOk()); // true
   * ```
   */
  isOk(): this is Ok<T> {
    return true;
  }

  /**
   * Returns true if this Result is an Err, false otherwise.
   * @returns {boolean} false as this Result is an Ok.
   * @example
   * ```ts
   * const result = new Ok(42);
   * console.log(result.isError()); // false
   * ```
   */
  isError(): this is Err<never> {
    return false;
  }

  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * @param {function(value: T): U} fn - The function to be applied to the value of this Result.
   * @returns {Result<U, never>} A Result that is the result of applying the given function to the value of this Result.
   * @example
   * ```ts
   * const result = new Ok(42);
   * const mappedResult = result.map(value => value.toString()); // mappedResult is Ok('42')
   * ```
   */
  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Ok(fn(this.#value));
  }

  /**
   * Returns a new Result that is the result of applying the given function to the error of this Result.
   * @param {function(error: never): E2} _ - The function to be applied to the error of this Result.
   * @returns {Result<T, E2>} This Result as it is an Ok.
   * @example
   * ```ts
   * const result = new Ok(42);
   * const mappedErrorResult = result.mapError(error => 'new error'); // mappedErrorResult is still Ok(42)
   * ```
   */
  mapError<E2>(_: (error: never) => E2): Result<T, E2> {
    return this;
  }

  /**
   * Returns the value of this Result.
   * @returns {T} The value of this Result.
   * @example
   * ```ts
   * const result = new Ok(42);
   * console.log(result.unwrap()); // 42
   * ```
   */
  unwrap(): T {
    return this.#value;
  }

  /**
   * Throws an error as this Result is an Ok.
   * @throws {Error} If this Result is an Ok.
   * @example
   * ```ts
   * const result = new Ok(42);
   * result.unwrapError(); // throws Error
   * ```
   */
  unwrapError(): never {
    throw new Error('Called unwrapError on an Ok value');
  }

  /**
   * Returns the value of this Result.
   * @param {T} _ - The value to be returned if this Result is an Err.
   * @returns {T} The value of this Result.
   * @example
   * ```ts
   * const result = new Ok(42);
   * console.log(result.unwrapOr(0)); // 42
   * ```
   */
  unwrapOr(_: T): T {
    return this.#value;
  }
}
