# TS Result

このライブラリは、Rust の`Result`型にインスパイアされた、操作の成功または失敗を表現するための TypeScript ライブラリです。`Ok`と`Err`の 2 つのクラスを提供し、操作の結果を簡潔に扱うことができます。

## インストール

```bash
npm install @shrimpcoder/ts-result
```

## 使い方

```ts
import { Result } from '@shrimpcoder/ts-result';

const result = Result.run(() => {
  return 100;
});

console.log(result.unwrap());
```

詳しくは[こちら](https://shrimpcoder.github.io/ts-result/index.html)を参照してください。

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。
