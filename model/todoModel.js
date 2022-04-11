import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { getDB, postDB } from '../repository/todoRepl.js';

export const todos = [
  { id: uuidv4(), title: 'test data 1', content: 'mock test data' },
];

export default todos;

// schema的資料結構 在建立model的時候藥用 依照自己的需求去定義
// 有需要改動再自己改
const todoSchema = () => {
  return new mongoose.Schema(
    {
      title: { type: String, required: [true, '標題必填'] },
      content: { type: String, required: [true, '內容必填'] },
    },
    {
      versionKey: false,
    }
  );
};

// 使用 mongoose 的 model方法 找到 db 的 collection 並套用 schema 資料結構
// 新增資料的時候需要用到
const Todolist = mongoose.model('todolist', todoSchema());

// 找到資料庫全部資料
export async function findMany() {
  
  // 測試用新增
  // await postDB(Todolist);

  // 把model當參數傳給連接資料庫的部份去搜尋
  const result = await getDB(Todolist);
  return result;
}

// 新增單筆資料到資料庫
export function insertOne(dataFromController) {
  todos.push({ id: uuidv4(), ...dataFromController });
  return todos;
}

// 更新單筆資料到資料庫
export function updateOne(data, updateIndex) {
  if (data.title !== undefined && data.content !== undefined) {
    todos[updateIndex].title = data.title;
    todos[updateIndex].content = data.content;
  } else if (data.title !== undefined) {
    todos[updateIndex].title = data.title;
  } else {
    todos[updateIndex].content = data.content;
  }
  return todos;
}

// 刪除單筆資料
export function deleteOne(deleteIndex) {
  todos.splice(deleteIndex, 1);
  return todos;
}

// 刪除多筆資料
export function deleteMany() {
  todos.length = 0;
  return todos;
}
