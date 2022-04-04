import http from 'http';
import { errorHandle, successHandle } from './utils/responseHandler.js';
import { errorMsg } from './utils/errorMsg.js';
import { getTodos,postTodos,deleteTodos,deleteTodo,patchTodos } from './controller/todosController.js';

const requestListener = (req, res) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  if (req.url == '/todos' && req.method == 'GET') {
    // 透過呼叫controller的getTodos函式取得回應
    getTodos(res);

  } else if (req.url == '/todos' && req.method == 'POST') {

    req.on('end', () => {
      // 透過呼叫controller的postTodos函式新增資料
      postTodos(res,body);
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // 透過呼叫controller的deleteTodos函式取得回應
    deleteTodos(res);
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // 透過呼叫controller的deleteTodo函式刪除指定資料
    const nowID = req.url.split('/').pop();
    deleteTodo(res, nowID);
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    // 透過呼叫controller的patchTodos函式取得回應
    req.on('end', () => {
    const updateID = req.url.split('/').pop();
    patchTodos(res, body, updateID);
    });
  } else if (req.method == 'OPTIONS') {
    successHandle(res);
  } else {
    errorHandle(res, errorMsg.NOT_FOUND, 404);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
