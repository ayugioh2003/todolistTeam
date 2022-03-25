import { errorHandle, successHandle } from '../utils/responseHandler.js';
import { errorMsg } from '../utils/errorMsg.js';
import { findMany, insertMany } from '../model/todoModel.js';

const error = (res,msg) => errorHandle(res, 400, msg);
const success = (res,result) => successHandle(res, JSON.stringify(result));

// 呼叫model裡面的findMany函式取得資料陣列
export const getTodos = (res) => {
  const result = findMany();
  success(res,result);
};
// 呼叫model裡面的insertMany函式新增資料陣列
export const postTodos = (res,chunk_data) => {
    try {
        const data = JSON.parse(chunk_data);
        if (!data.title || !data.content) {
          error(res,errorMsg.POST);
          return;
        }
        const insertResult = insertMany(data);
        success(res,insertResult);
    } catch {
        error(res,errorMsg.POST);
    }
  
};
