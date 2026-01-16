# CircleCI Self-Hosted Runner デモプロジェクト

このプロジェクトは、CircleCIのSelf-Hosted Runner機能を試すためのデモプロジェクトです。PoC（概念実証）で利用することを想定しています。

## 概要

このプロジェクトは、Node.js + TypeScript + Viteで構築されたシンプルなカウンターアプリケーションです。CircleCIのSelf-Hosted Runnerを使用してCI/CDパイプラインを実行する方法を学ぶことができます。

### プロジェクト構成

- **フレームワーク**: Vite（ビルドツール）
- **言語**: TypeScript
- **テストフレームワーク**: Vitest
- **テスト環境**: jsdom（ブラウザ環境のモック）

### 機能

- シンプルなカウンター機能（クリックでカウントアップ）
- ユニットテスト（Vitest）
- CircleCI Self-Hosted RunnerでのCI/CD実行

## 前提条件

- CircleCIアカウント
- CircleCI Self-Hosted Runnerのセットアップ済み環境
- Node.js（v18以上推奨）
- npm または yarn

## Self-Hosted Runnerのセットアップ

### 1. CircleCIでRunnerを登録

1. CircleCIのダッシュボードにログイン
2. **Settings** → **Runner** に移動
3. 新しいRunnerを作成し、リソースクラス名を取得（例: `your-org/your-runner-name`）

### 2. Runnerのインストールと起動

CircleCIのドキュメントに従って、Self-Hosted Runnerをインストールし、起動してください。

詳細は [CircleCI Self-Hosted Runner ドキュメント](https://circleci.com/docs/runner-overview/) を参照してください。

### 3. CircleCI設定の更新

`.circleci/config.yml` ファイル内の `resource_class` を、あなたのRunnerのリソースクラス名に更新してください：

```yaml
jobs:
  runner-test:
    machine: true
    resource_class: your-org/your-runner-name  # ここを更新
    steps:
      - run: echo "Hi I'm on Runners!"
```

## CircleCI設定の説明

このプロジェクトのCircleCI設定（`.circleci/config.yml`）は以下のようになっています：

```yaml
version: 2.1

orbs:
  node: circleci/node@7.2.1

workflows:
  testing:
    jobs:
      - runner-test
      - node/test:
          pkg-manager: npm
          run-command: test:ci

jobs:
  runner-test:
    machine: true
    resource_class: your-org/your-runner-name
    steps:
      - run: echo "Hi I'm on Runners!"
```

### 設定のポイント

- **`orbs`**: CircleCI Node.js Orbを使用してNode.js環境をセットアップします
- **`workflows`**: `testing`ワークフローで2つのジョブを実行します：
  - `runner-test`: Self-Hosted Runner上で実行されるジョブ
  - `node/test`: CircleCIのクラウド環境でテストを実行するジョブ（比較用）
- **`machine: true`**: Machine Executorを使用します
- **`resource_class`**: Self-Hosted Runnerのリソースクラス名を指定します（実際の値に置き換えてください）
- **`steps`**: 実行するステップを定義します

### 実際の設定例

現在の設定では、`resource_class` が `hidetaka/first-local-runner` に設定されています。ご自身の環境に合わせて変更してください。

## ワークフローの実行

1. このリポジトリをCircleCIに接続
2. コードをプッシュまたはマージ
3. CircleCIのダッシュボードでジョブの実行を確認
4. Self-Hosted Runner上でジョブが実行されることを確認

## ローカルでのセットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd cci-nodejs-self-host-runner
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションを確認できます。

### 4. ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### 5. ビルドのプレビュー

```bash
npm run preview
```

ビルドされたアプリケーションをローカルでプレビューできます。

### 6. テストの実行

```bash
# テストを実行（ウォッチモード）
npm test

# CI用のテストを実行（一度だけ実行）
npm run test:ci

# テストUIを起動
npm run test:ui

# カバレッジレポートを生成
npm run test:coverage
```

このプロジェクトでは、Vitestを使用してカウンター機能のテストを実行します。テストは `src/counter.test.ts` に定義されています。

## トラブルシューティング

### Runnerがジョブを受け取らない

- Runnerが起動していることを確認
- `resource_class` が正しく設定されているか確認
- CircleCIのRunner設定でリソースクラス名が一致しているか確認

### ジョブが失敗する

- Runnerのログを確認
- 必要なツール（Node.js、npmなど）がRunner環境にインストールされているか確認
- CircleCIのジョブログでエラーメッセージを確認

### ローカルでテストが失敗する

- Node.jsのバージョンを確認（`node --version`）
- 依存関係が正しくインストールされているか確認（`npm install`を再実行）
- `npm test`で詳細なエラーメッセージを確認

## プロジェクト構造

```
cci-nodejs-self-host-runner/
├── .circleci/
│   └── config.yml          # CircleCI設定ファイル
├── src/
│   ├── counter.ts          # カウンター機能の実装
│   ├── counter.test.ts     # カウンターのテスト
│   ├── main.ts             # アプリケーションのエントリーポイント
│   └── style.css           # スタイルシート
├── public/                 # 静的ファイル
├── dist/                   # ビルド出力（生成される）
├── package.json            # プロジェクトの依存関係とスクリプト
├── tsconfig.json           # TypeScript設定
├── vitest.config.ts        # Vitest設定
└── README.md               # このファイル
```

## 次のステップ

このデモプロジェクトを基に、以下のような拡張が可能です：

- Self-Hosted Runner上でのビルドステップの追加
- Self-Hosted Runner上でのテストステップの追加
- デプロイステップの追加
- 複数のRunnerリソースクラスの使用
- 並列ジョブの実行
- アーティファクトの保存と取得

## 参考資料

- [CircleCI Self-Hosted Runner ドキュメント](https://circleci.com/docs/runner-overview/)
- [CircleCI設定リファレンス](https://circleci.com/docs/config-intro/)
- [Vite ドキュメント](https://vitejs.dev/)
- [Vitest ドキュメント](https://vitest.dev/)

## ライセンス

このプロジェクトはデモ目的で提供されています。

