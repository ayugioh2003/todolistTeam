import { errorHandle, successHandle } from '../utils/responseHandler.js';
import { errorMsg } from '../utils/errorMsg.js';
import { findMany, insertOne, updateOne, deleteOne, deleteMany } from '../model/todoModel.js';

// 呼叫model裡面的findMany函式取得資料陣列
export const getTodos = (res) => {
  const result = findMany();
  successHandle(res,result);
};
// 呼叫model裡面的insertOne函式新增資料陣列
export const postTodos = (res,chunkData) => {
    try {
        const data = JSON.parse(chunkData);
        if (!data.title || !data.content) {
          errorHandle(res,errorMsg.POST);
          return;
        }
        const insertResult = insertOne(data);
        successHandle(res,insertResult);
    } catch {
        errorHandle(res,errorMsg.POST);
    }
};
