import express from 'express';
import * as handler from '../handlers';

const router = express.Router();
//------ /users ----------
router
  .route('/users')
  //------ Userの一覧を得る -----
  .get(handler.getUsers)
  //------ Userを一件追加する -----
  .post(handler.addUser);

//------ /users/{user_id}/ ----------
router
  .route('/users/:user_id/')
  //------ idを使って特定のUserを得る -----
  .get(handler.getUserById)
  //------ idを使って特定のUserを変更する -----
  .put(handler.updateUser);

export default router;
