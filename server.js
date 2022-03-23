import http from "http";
import { v4 as uuidv4 } from "uuid";
import { todos } from "./model/todoModel.js";
import { errorHandle } from "./errorHandle.js";

const requestListener = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
    res.writeHead(200, headers);
    res.write(JSON.stringify(todos));
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.title || !data.content) {
          errorHandle(res);
          return;
        }
        todos.push({ ...data, id: uuidv4() });
        res.writeHead(200, headers);
        res.write(JSON.stringify(todos));
        res.end();
      } catch {
        errorHandle(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
