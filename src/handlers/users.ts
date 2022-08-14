import { NextFunction, Request, Response } from 'express';
import CreateError from 'http-errors';

import getConnection from '../util/connection';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = [
    { id: 1, user_id: 'TANAKA_001', password: 'hogehoge' },
    { id: 2, user_id: 'YAMADA_002', password: 'piyopiyo' },
    { id: 3, user_id: 'SAITOU_003', password: 'foobar' },
  ];
  res.status(200).json(result);
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  // パスパラメータの取得
  const userId = req.params.user_id;
  // パスパラメータの設定がない場合はエラーとして終了
  if (!userId) {
    next(CreateError(400, 'not found path parameter => user_id'));
  }
  let connection: any;
  let result: any;
  try {
    connection = await getConnection();
    const selectSql = 'SELECT id,user_id,password FROM users WHERE id=?';
    // SQLの実行
    result = await connection.execute(selectSql, [userId]);
    if (result[0].length === 0) {
      // 該当データが無い場合
      next(CreateError(404, 'not found data id:' + userId));
    } else {
      // 該当データがある場合
      res.status(200).json(result[0][0]);
    }
  } catch (err) {
    next(err);
  } finally {
    // MySQLへの接続を終了
    if (connection) await connection.end();
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  // POSTデータの取得
  const userId = req.body.user_id;
  const password = req.body.password;
  // POSTデータがない場合はエラーとして終了
  if (!userId || !password) {
    next(CreateError(400, 'illegal request body data'));
    return;
  }
  let connection: any;
  let result: any;
  try {
    connection = await getConnection();
    const insertSql = 'INSERT INTO users(user_id,password) VALUES (?,?)';
    // SQLの実行
    result = await connection.execute(insertSql, [userId, password]);
    res.status(201).json(result[0][0]);
  } catch (err) {
    next(err);
  } finally {
    // MySQLへの接続を終了
    if (connection) await connection.end();
  }
};

export const updateUser = (req: Request, res: Response) => {
  //未実装のため404をレスポンス
  res.status(404).end();
};
