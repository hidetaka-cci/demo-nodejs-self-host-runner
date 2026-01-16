# CircleCI Self-Hosted Runner デモプロジェクト

このプロジェクトは、CircleCIのSelf-Hosted Runner機能を試すためのデモプロジェクトです。PoC（概念実証）で利用することを想定しています。

## 概要

このプロジェクトは、Node.js + TypeScript + Viteで構築されたシンプルなカウンターアプリケーションです。CircleCIのSelf-Hosted Runnerを使用してCI/CDパイプラインを実行する方法を学ぶことができます。

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

### 5. テストの実行

```bash
# テストを実行
npm test

# テストUIを起動
npm run test:ui

# カバレッジレポートを生成
npm run test:coverage
```

## CircleCI設定の説明

このプロジェクトのCircleCI設定（`.circleci/config.yml`）は以下のようになっています：

```yaml
version: 2.1
workflows:
  testing:
    jobs:
      - runner-test
jobs:
  runner-test:
    machine: true
    resource_class: your-org/your-runner-name
    steps:
      - run: echo "Hi I'm on Runners!"
```

### 設定のポイント

- **`machine: true`**: Machine Executorを使用します
- **`resource_class`**: Self-Hosted Runnerのリソースクラス名を指定します
- **`steps`**: 実行するステップを定義します

## ワークフローの実行

1. このリポジトリをCircleCIに接続
2. コードをプッシュまたはマージ
3. CircleCIのダッシュボードでジョブの実行を確認
4. Self-Hosted Runner上でジョブが実行されることを確認

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

## 次のステップ

このデモプロジェクトを基に、以下のような拡張が可能です：

- より複雑なビルドステップの追加
- テストステップの追加
- デプロイステップの追加
- 複数のRunnerリソースクラスの使用
- 並列ジョブの実行

## 参考資料

- [CircleCI Self-Hosted Runner ドキュメント](https://circleci.com/docs/runner-overview/)
- [CircleCI設定リファレンス](https://circleci.com/docs/config-intro/)
- [Vite ドキュメント](https://vitejs.dev/)
- [Vitest ドキュメント](https://vitest.dev/)

## ライセンス

このプロジェクトはデモ目的で提供されています。

