import { errorHandle, successHandle } from '../utils/responseHandler.js';
import { errorMsg } from '../utils/errorMsg.js';
import {
  modelOperator,
  findMany,
  insertOne,
  updateOne,
  deleteOne,
  deleteMany,
} from '../model/todoModel.js';

const bufferHandle = async (req) => {
  let buffers = [];
  for await (const buffer of req) {
    buffers.push(buffer);
  }
  const data = await JSON.parse(Buffer.concat(buffers).toString());
  return data;
};

// 呼叫model裡面的findMany函式取得資料陣列
export const getTodos = async (res) => {
  const result = await modelOperator('GET',reqData);
  successHandle(res, result);
};

// 呼叫model裡面的insertOne函式新增資料陣列
export const postTodos = async (req, res) => {
  try {
    const data = await bufferHandle(req);
    const { content, title } = data;

    if (!title || !content) {
      errorHandle(res, errorMsg.POST);
      return;
    }
    const insertResult = insertOne(data);
    successHandle(res, insertResult);
  } catch {
    errorHandle(res, errorMsg.POST);
  }
};

// 呼叫model裡面的deleteMany函式刪除多筆資料
export const deleteTodos = (res) => {
  const result = deleteMany();
  successHandle(res, result);
};

// 呼叫model裡面的updateOne函式更新單筆資料
export const patchTodos = async (req, res, updateID) => {
  try {
    const data = await bufferHandle(req);
    const { title, content } = data;
    const updateIndex = findMany().findIndex((ele) => updateID == ele.id);

    if ((title !== undefined || content !== undefined) && updateIndex !== -1) {
      const updateResult = updateOne(data, updateIndex);
      successHandle(res, updateResult);
    } else {
      errorHandle(res, errorMsg.PATCH);
    }
  } catch {
    errorHandle(res, errorMsg.PATCH);
  }
};

// 呼叫model裡面的deleteOne函式刪除單筆資料
export const deleteTodo = (res, nowID) => {
  const deleteIndex = findMany().findIndex((ele) => nowID === ele.id);
  if (deleteIndex !== -1) {
    const result = deleteOne(deleteIndex);
    successHandle(res, result);
  } else {
    errorHandle(res, errorMsg.DELETE);
  }
};
