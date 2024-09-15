import { Err } from './Err';
import { Ok } from './Ok';

/**
 * Result is a type that represents a result of an operation that may or may not be successful.
 */
export interface Result<T = unknown, E = Error> {
  /**
   * Returns a Result.
   * If this Result is an Ok, the function returns passed Result.
   * If this Result is an Err, the function returns this Result.
   * @param {Result<U, E2>} res - The Result to be returned if this Result is an Err.
   * @returns {Result<U, E | E2>} A Result that is the result of applying the given function to the value of this Result.
   */
  and<U, E2 = Error>(res: Result<U, E2>): Result<U, E | E2>;
  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * If this Result is an Err, the function is not applied and the error is returned.
   * @param {function(value: T): Result<U, E2>} fn - The function to be applied to the value of this Result.
   * @returns {Result<U, E | E2>} A Result that is the result of applying the given function to the value of this Result.
   */
  andThen<U, E2 = Error>(fn: (value: T) => Result<U, E2>): Result<U, E | E2>;
  /**
   * Returns true if this Result is an Ok, false otherwise.
   * @returns {boolean} true if this Result is an Ok, false otherwise.
   */
  isOk(): this is Ok<T>;
  /**
   * Returns true if this Result is an Err, false otherwise.
   * @returns {boolean} true if this Result is an Err, false otherwise.
   */
  isError(): this is Err<E>;
  /**
   * Returns a new Result that is the result of applying the given function to the value of this Result.
   * If this Result is an Err, the function is not applied and the error is returned.
   * @param {function(value: T): U} fn - The function to be applied to the value of this Result.
   * @returns {Result<U, E>} A Result that is the result of applying the given function to the value of this Result.
   */
  map<U>(fn: (value: T) => U): Result<U, E>;
  /**
   * Returns a new Result that is the result of applying the given function to the error of this Result.
   * If this Result is an Ok, the function is not applied and the value is returned.
   * @param {function(error: E): E2} fn - The function to be applied to the error of this Result.
   * @returns {Result<T, E2>} A Result that is the result of applying the given function to the error of this Result.
   */
  mapError<E2>(fn: (error: E) => E2): Result<T, E2>;
  /**
   * Returns the value of this Result.
   * @returns {T} The value of this Result.
   * @throws {Error} If this Result is an Err.
   */
  unwrap(): T;
  /**
   * Returns the error of this Result.
   * @returns {E} The error of this Result.
   * @throws {Error} If this Result is an Ok.
   */
  unwrapError(): E;
  /**
   * Returns the value of this Result.
   * If this Result is an Err, the defaultValue is returned.
   * @param {T} defaultValue - The value to be returned if this Result is an Err.
   * @returns {T} The value of this Result.
   */
  unwrapOr(defaultValue: T): T;
}

/**
 * Result is a type that represents a result of an operation that may or may not be successful.
 */
export namespace Result {
  /**
   * Runs a function and returns a Result.
   * If the function succeeds, the Ok is returned.
   * If the function fails, the Err is returned.
   * @param {function(): T} fn - The function to be run.
   * @returns {Result<T, Error>} A Result that is the result of running the given function.
   * @example
   * ```ts
   * const result = Result.run(() => {
   *   if (Math.random() > 0.5) {
   *     return 'Success';
   *   } else {
   *     throw new Error('Failure');
   *   }
   * });
   * if (result.isOk()) {
   *   console.log(result.unwrap()); // 'Success'
   * } else {
   *   console.error(result.unwrapError()); // Error: 'Failure'
   * }
   * ```
   */
  export function run<T>(fn: () => T): Result<T, Error> {
    try {
      return new Ok(fn());
    } catch (error) {
      return new Err(error as Error);
    }
  }

  /**
   * Runs an async function and returns a Result.
   * If the function succeeds, the Ok is returned.
   * If the function fails, the Err is returned.
   * @param {function(): Promise<T>} fn - The async function to be run.
   * @returns {Promise<Result<T, Error>>} A Promise that resolves to a Result that is the result of running the given async function.
   * @example
   * ```ts
   * const result = await Result.runAsync(async () => {
   *   if (Math.random() > 0.5) {
   *     return 'Success';
   *   } else {
   *     throw new Error('Failure');
   *   }
   * });
   * if (result.isOk()) {
   *   console.log(result.unwrap()); // 'Success'
   * } else {
   *   console.error(result.unwrapError()); // Error: 'Failure'
   * }
   * ```
   */
  export async function runAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
    return fn()
      .then((value) => new Ok(value))
      .catch((error) => new Err(error as Error));
  }
}
