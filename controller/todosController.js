import { errorHandle, successHandle } from '../utils/responseHandler.js';
import { errorMsg } from '../utils/errorMsg.js';
import { findMany, insertOne, updateOne, deleteOne, deleteMany } from '../model/todoModel.js';

const error = (res,msg) => errorHandle(res, 400, msg);
const success = (res,result) => successHandle(res, JSON.stringify(result));

// 呼叫model裡面的findMany函式取得資料陣列
export const getTodos = (res) => {
  const result = findMany();
  success(res,result);
};
// 呼叫model裡面的insertOne函式新增資料陣列
export const postTodos = (res,chunkData) => {
    try {
        const data = JSON.parse(chunkData);
        if (!data.title || !data.content) {
          error(res,errorMsg.POST);
          return;
        }
        const insertResult = insertOne(data);
        success(res,insertResult);
    } catch {
        error(res,errorMsg.POST);
    }
  
};
