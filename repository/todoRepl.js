import mongoose from 'mongoose';
// 環境變數套件
// import dotenv from 'dotenv';
import dotenv from 'dotenv';
// 解決找不到環境變數  先找出目前檔案的位置
const currentPath = process.cwd();
// 讓套件找到自定義的環境變數
dotenv.config({ path: currentPath + '/config.env' });
const DBString = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
// 連線資料庫函式
function DBConnect() {
  const DB = mongoose
    .connect(DBString)
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

