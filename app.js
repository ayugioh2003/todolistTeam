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

  if (url == '/todos' && method == 'GET') getTodos(res)
  else if (url == '/todos' && method == 'POST') postTodos(req, res)
  else if (url == '/todos' && method == 'DELETE') deleteTodos(res)
  else if (url.startsWith('/todos/') && method == 'DELETE') deleteTodo(res, url.split('/').pop());
  else if (url.startsWith('/todos/') && method == 'PATCH') patchTodos(req, res, url.split('/').pop());
  else if (method == 'OPTIONS') successHandle(res)
  else errorHandle(res, errorMsg.NOT_FOUND, 404)
};