# E-Commerce Demo Application

マイクロサービスアーキテクチャで構築されたEコマースデモアプリケーション

## 🏗️ アーキテクチャ

このアプリケーションは以下のマイクロサービスで構成されています：

### バックエンドサービス
- **API Gateway** (`api-gateway/`) - 全てのAPIリクエストのエントリーポイント
- **Authentication Service** (`authentication-service/`) - ユーザー認証とトークン管理
- **Product Service** (`product-service/`) - 商品管理
- **Cart Service** (`cart-service/`) - ショッピングカート機能
- **Purchase Service** (`purchase-service/`) - 購入処理
- **Log Service** (`log-service/`) - ログ管理
- **Mail Service** (`mail-service/`) - メール送信機能
- **Notification Service** (`notification-service/`) - 通知機能

### フロントエンド
- **Front-end** (`front-end/`) - React + TypeScript + Vite で構築されたSPA

### インフラストラクチャ
- **Apache Kafka** - サービス間の非同期通信
- **PostgreSQL** - ユーザーデータと商品データの永続化
- **MongoDB** - ログデータの保存
- **Docker** - コンテナ化とオーケストレーション

## 🚀 セットアップ・起動方法

### 前提条件
- Docker & Docker Compose
- Make
- Go 1.19+ (開発時)
- Node.js 18+ (フロントエンド開発時)

### 1. リポジトリをクローン
```bash
git clone <repository-url>
cd e-commerce-demo
```

### 2. アプリケーション全体を起動
```bash
cd project
make up_build
```

このコマンドで以下が実行されます：
- 全てのGoサービスのビルド
- Dockerイメージの作成
- Docker Composeによる全サービスの起動

### 3. フロントエンドの起動（開発時）
```bash
cd front-end
npm install
npm run dev
```

### 4. アプリケーション停止
```bash
cd project
make down
```

## 📋 利用可能なエンドポイント

### API Gateway (Port: 8081)
- `POST /authenticate` - ユーザー認証
- `POST /sign-up` - ユーザー登録
- `POST /log-out` - ログアウト
- `GET /products` - 商品一覧取得
- `GET /ping` - ヘルスチェック

### フロントエンド (Port: 5173)
- `/` - ホーム
- `/men` - メンズ商品
- `/women` - レディース商品
- `/kids` - キッズ商品
- `/cart` - ショッピングカート
- `/user` - ユーザープロファイル
- `/notifications` - 通知

## 🛠️ 開発

### バックエンド開発
各サービスは独立したGoモジュールとして開発されています：

```bash
# 例：認証サービスの開発
cd authentication-service
go mod tidy
go run ./cmd
```

### フロントエンド開発
React + TypeScript + Tailwind CSS で構築されています：

```bash
cd front-end
npm run dev     # 開発サーバー起動
npm run build   # プロダクションビルド
npm run lint    # ESLintによるコードチェック
```

## 🗄️ データベース

### PostgreSQL
- **Auth DB** (Port: 5432) - ユーザー情報
- **Product DB** (Port: 5431) - 商品情報

### MongoDB
- **Log DB** (Port: 27017) - ログデータ

初期データは `project/sql/` ディレクトリのSQLファイルから自動的に投入されます。

## 🔧 技術スタック

### バックエンド
- **言語**: Go
- **HTTPルーター**: net/http (標準ライブラリ)
- **メッセージング**: Apache Kafka
- **データベース**: PostgreSQL, MongoDB

### フロントエンド
- **フレームワーク**: React 19
- **言語**: TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS 4
- **ルーティング**: React Router Dom
- **アイコン**: React Icons

### インフラ
- **コンテナ**: Docker & Docker Compose
- **リバースプロキシ**: API Gateway
- **メッセージブローカー**: Apache Kafka + Zookeeper

## 📁 プロジェクト構造

```
e-commerce-demo/
├── api-gateway/           # APIゲートウェイ
├── authentication-service/ # 認証サービス
├── product-service/       # 商品サービス
├── purchase-service/      # 購入サービス
├── log-service/          # ログサービス
├── mail-service/         # メールサービス
├── notification-service/ # 通知サービス
├── front-end/            # Reactフロントエンド
└── project/              # Docker構成とSQL
    ├── docker-compose.yml
    ├── Makefile
    └── sql/              # データベース初期化用SQL
```

## 🎯 主な機能

- ユーザー登録・認証
- 商品カテゴリ別表示（メンズ、レディース、キッズ）
- ショッピングカート
- 通知システム

## 🔗 開発者向け情報

### ローカル開発環境のポート
- API Gateway: 8081
- Frontend: 5173
- PostgreSQL (Auth): 5432
- PostgreSQL (Product): 5431
- MongoDB (Logs): 27017
- Kafka: 9092

### 環境設定
各サービスの設定は `config/config.json` ファイルで管理されています。
