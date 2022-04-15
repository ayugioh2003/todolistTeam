import { errorHandle, successHandle } from '../utils/responseHandler.js';
import { errorMsg } from '../utils/errorMsg.js';
import {
  modelOperator,
  findMany,
  insertOne,
  updateOne,
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
  // 假資料 req接收到的資料 bufferHandle成功才會把資料傳給model.js的方法
  // 這邊只負責處理接收到的req處理  處理完傳給model.js裡面的方法做二次處理(加上id createAt這類不是使用者填的東西)
  // 實際上get應該不會使用到req的資料
  // 確認沒問題會刪除給post的組員做
  const reqData = { title: 'reqData', content: 'req物件的內容2' };

  // 直接呼叫操作mongoose.model的方法
  // 先寫死 沒問題再改成用method傳進來
  const result = await modelOperator('GET',reqData);
  // const result = await findMany(reqData);
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
export const deleteTodos = async (res) => {
  try {
    const reqData = await findMany(res);
    if(reqData.length === 0){
      errorHandle(res, errorMsg.DELETES);
      return;
    }
      const result = await modelOperator('DELETE_MANY',reqData);
      successHandle(res, result);
  } catch {
    errorHandle(res, errorMsg.DELETES);
  }
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
export const deleteTodo = async (res, nowID) => {
  try {
    const result = await modelOperator('DELETE_ONE', nowID);
    successHandle(res, result);
  } catch (error) {
    errorHandle(res, errorMsg.DELETE);
  }
};
