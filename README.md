# TS Result

This library is a TypeScript library inspired by Rust's `Result` type, designed to represent the success or failure of an operation. It provides two classes, `Ok` and `Err`, to handle the results of operations concisely.

## Installation

```bash
npm install @shrimpcoder/ts-result
```

## Usage

```ts
import { Result } from '@shrimpcoder/ts-result';

const result = Result.run(() => {
  return 100;
});

console.log(result.unwrap());
```

For more details, see [here](https://shrimpcoder.github.io/ts-result/index.html).

## License

This project is licensed under the MIT License.
