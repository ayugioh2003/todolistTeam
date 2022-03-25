import { v4 as uuidv4 } from "uuid";

export const todos = [
  { id: uuidv4(), title: "test data 1", content: "mock test data" },
];

export default todos;

// 找到資料庫全部資料
export function findMany() {
  return todos;
}

// 新增多筆資料到資料庫
export function insertMany(data_from_controller) {
  todos.push({ id: uuidv4(), ...data_from_controller });
  return todos;
}