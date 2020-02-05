import { NextFunction, Request, Response } from 'express'
import CreateError from 'http-errors'

import getConnection from '../util/connection'

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    const result = [
        {  id: 1 , naiyo: 'プログラミングする' , kinkyu: 'いそぐ' },
        {  id: 2 , naiyo: 'テストする' , kinkyu: '気が向いたら' },
        {  id: 3 , naiyo: '納品する' , kinkyu: 'そのうち' }
    ]
    res.status(200).json({items: result})
}

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    // パスパラメータの取得
    const todoId = req.params.todo_id
    // パスパラメータの設定がない場合はエラーとして終了
    if(!todoId){
        next(CreateError(400,'not found path parameter => todo_id'))
    }
    let connection: any
    let result: any
    try {
        connection = await getConnection()
        const selectSql = 'SELECT id,naiyo,kinkyu FROM todos WHERE id=?'
        // SQLの実行
        result = await connection.execute(selectSql, [todoId])
    } catch (err) {
        next(err)
    } finally {
        // MySQLへの接続を終了
        if(connection) await connection.end()
    }
    if(result[0].length === 0){
        // 該当データが無い場合
        next(CreateError(404,'not found data id:' + todoId ))
    } else {
        // 該当データがある場合
        res.status(200).json(result[0][0])
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    // POSTデータの取得
    const id = req.body.id
    const naiyo = req.body.naiyo
    const kinkyu = req.body.kinkyu
    // POSTデータがない場合はエラーとして終了
    if(!id || !naiyo || !kinkyu ){
        next(CreateError(400,'not found body data'))
    }
    let connection: any
    let result: any
    try {
        connection = await getConnection()
        const insertSql = 'INSERT INTO todos(id,naiyo,kinkyu) VALUES (?,?,?)'
        // SQLの実行
        result = await connection.execute(insertSql,[id,naiyo,kinkyu])
    } catch (err) {
        next(err)
    } finally {
        // MySQLへの接続を終了
        if(connection) await connection.end()
    }
    res.status(201).json(result[0][0])
}

export const updateTodo = (req: Request, res: Response) => {
    res.status(200).json({id: 10 , naiyo: '基本設計をする' , kinkyu: 'なるはや' })
}