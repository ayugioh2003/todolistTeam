import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import { todos } from './model/todoModel.js';
import { errorHandle, successHandle } from './utils/responseHandler.js';
import { errorMsg } from './utils/errorMsg.js';
import { getTodos,postTodos } from './controller/todosController.js';

const requestListener = (req, res) => {
  const error = (msg) => errorHandle(res, 400, msg);
  const success = () => successHandle(res, JSON.stringify(todos));

  if (req.url == '/todos' && req.method == 'GET') {
    // getTodo.js
    // 下面函式移到controller裡面
    // success();

    // 透過呼叫controller的getTodos函式取得回應
    getTodos(res);

  } else if (req.url == '/todos' && req.method == 'POST') {
    // postTodo.js
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {

      // 透過呼叫controller的postTodos函式新增資料
      postTodos(res,body);
      
      // 下面的程式碼移到controller執行
      // try {
      //   const data = JSON.parse(body);
      //   if (!data.title || !data.content) {
      //     error(errorMsg.POST);
      //     return;
      //   }
      //   todos.push({ id: uuidv4(), ...data });
      //   success();
      // } catch {
      //   error(errorMsg.POST);
      // }
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    // patchTodo.js
  } else if (req.method == 'OPTIONS') {
    successHandle(res);
  } else {
    errorHandle(res, 404, errorMsg.NOT_FOUND);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
