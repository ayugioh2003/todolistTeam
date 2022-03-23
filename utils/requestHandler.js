const request = (res, status, content) => {
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

export function errorHandle(res, status = 400, msg = "請求錯誤，請洽維修人員") {
  request(res, status, JSON.stringify({
    status: "false",
    message: msg,
  }))
}

export function successHandle(res, content) {
  request(res, 200, content)
}