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
// 呼叫model裡面的deleteMany函式刪除多筆資料
export const deleteTodos = (res) => {
  const result = deleteMany();
  successHandle(res,result);
}

// 呼叫model裡面的updateOne函式更新單筆資料
export const patchTodos = (res, chunkData, updateID) => {
  try{
      const data = JSON.parse(chunkData);
      const updateIndex = findMany().findIndex(ele => updateID == ele.id);
    if(data.title !== undefined || data.content !== undefined && updateIndex !== -1){
      const updateResult = updateOne(data, updateIndex);
      successHandle(res, updateResult);
    } else {
      errorHandle(res, errorMsg.PATCH)
    }
  }catch{
    errorHandle(res, errorMsg.PATCH)
  }
}

// 呼叫model裡面的deleteOne函式刪除單筆資料
export const deleteTodo = (res, nowID) => {
  const deleteIndex = findMany().findIndex(ele => nowID === ele.id);
  if(deleteIndex !== -1) {
    const result = deleteOne(deleteIndex);
    successHandle(res,result);
  }
  else {
    errorHandle(res,errorMsg.DELETE);
  }
}
