// 一括ルーティング設定ファイル
import express from 'express'
import * as handler from '../handlers'

const router = express.Router()
//------ /todos ----------
router.route('/todos')
//------ Todoの一覧を得る -----
.get(handler.getTodos)
//------ Todoを一件追加する -----
.post(handler.addTodo)

//------ /todos/{todo_id}/ ----------
router.route('/todos/:todo_id/')
//------ idを使って特定のTodoを得る -----
.get(handler.getTodoById)
//------ idを使って特定のTodoを変更する -----
.put(handler.updateTodo)


export default router
