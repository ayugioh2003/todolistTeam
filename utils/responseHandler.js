import { errorMsg } from './errorMsg.js';

const response = (res, status, content) => {
  // CORS Header
  res.writeHead(status, {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-Type': 'application/json'
  });
  if (content)
    res.write(content);
  res.end();
}

export function errorHandle(res, msg = errorMsg.DEFAULT, status = 400) {
  response(res, status, JSON.stringify({
    status: "false",
    message: msg,
  }))
}

export function successHandle(res, data) {
  response(res, 200, JSON.stringify({
    status: "success",
    data
  }))
}