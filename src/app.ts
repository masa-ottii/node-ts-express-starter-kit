// .envファイルがあればそれを優先して読み込み
// なければ環境変数より設定値を取得
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

// express関連をインポート
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser'; // POST時のBODY部取得
// expressアプリケーションの生成
const app = express();

// 同一オリジン制約を回避（開発時にのみ有効）
import cors from 'cors';
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}
// とりあえずのセキュリティ対策
import helmet from 'helmet';
app.use(helmet());

// expressアプリケーションの基本設定
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// TODO


// ルートハンドラーの設定
import router from './routers';
app.use('/', router);

// HTTPエラーレスポンスを作るパッケージをインポート
import CreateError from 'http-errors';

// 該当するルートハンドラーがない場合は404エラーとする
app.use((req: Request, res: Response, next: NextFunction) => {
  next(CreateError(404));
});

// 共通エラーハンドラーの設定
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({ status, message });
});

export default app;
