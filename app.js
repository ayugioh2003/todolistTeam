// Utils
import { errorHandle, successHandle } from './utils/responseHandler.js';
import { errorMsg } from './utils/errorMsg.js';

import {
  getTodos,
  postTodos,
  deleteTodos,
  deleteTodo,
  patchTodos
} from './controller/todosController.js';

export default (req, res) => {
  const { url, method } = req
  let body = '';

  req.on('data', (chunk) => (body += chunk));

  // 透過呼叫 controller 的 getTodos 函式取得回應
  if (url == '/todos' && method == 'GET') getTodos(res)
  // 透過呼叫 controller 的 postTodo s函式新增資料
  else if (url == '/todos' && method == 'POST') postTodos(res, body)
  // 透過呼叫 controller 的 deleteTodo 函式刪除指定資料
  else if (url == '/todos' && method == 'DELETE') deleteTodos(res)
  // 透過呼叫 controller 的 deleteTodos 函式取得回應
  else if (url.startsWith('/todos/') && method == 'DELETE') deleteTodo(res, url.split('/').pop());
  // 透過呼叫 controller 的 patchTodos 函式取得回應
  else if (url.startsWith('/todos/') && method == 'PATCH') patchTodos(res, body, url.split('/').pop());
  else if (method == 'OPTIONS') successHandle(res)
  else errorHandle(res, errorMsg.NOT_FOUND, 404)
};