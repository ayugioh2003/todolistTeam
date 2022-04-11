import mongoose from 'mongoose';
// 環境變數套件
import dotenv from 'dotenv';
// 讓套件找到自定義的環境變數
dotenv.config({ path: '../config.env' });

const dbString = process.env.DB_CONNECT_STRING;

// 連線資料庫函式
function DBConnect() {
  const DB = mongoose
    .connect(
    //   '這裡放雲端DB的連線字串'
    // 或放環境變數 dbString
    )
    .then(() => {
      console.log('db connected');
    })
    .catch((err) => {
      console.log(err);
    });
  return DB;
}

// 用傳進來的model去資料庫搜尋
export async function getDB(model) {
  // 等待資料庫連線
  await DBConnect();
  const result = await model.find();
  return result;
}

// 測試用新增 get功能確定沒問題就可以刪除
export async function postDB(model) {

  // 等待資料庫連線
  await DBConnect();
  const newTodolist = new model({
    title: '第四個項目',
    content: '第一個內容',
  });

  return await newTodolist
    .save()
    .then(() => {
      console.log('create success');
    })
    .catch((err) => {
      console.log(err);
    });
}
