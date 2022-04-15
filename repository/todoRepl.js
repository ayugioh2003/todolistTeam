import mongoose from 'mongoose';
// 環境變數套件
// import dotenv from 'dotenv';
import dotenv from 'dotenv';
// 解決找不到環境變數  先找出目前檔案的位置
const currentPath = process.cwd();
// 讓套件找到自定義的環境變數
dotenv.config({ path: currentPath + '/config.backup.env' });
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

// 測試用新增 get功能確定沒問題就可以刪除
// modelData 是根據schema定義出的 物件 資料格式
export async function postDB(schemaModel, modelData) {
  // 等待資料庫連線
  await DBConnect();
  const newTodolist = new schemaModel(modelData);

  return await newTodolist
    .save()
    .then(() => {
      console.log('create success');
    })
    .catch((err) => {
      console.log('資料寫入錯誤');
      console.log(err);
    });
}

export async function deleteOneDB(schemaModel, deleteId) {
  await DBConnect();
   await schemaModel.findByIdAndDelete(deleteId)
    .then(() => console.log("單筆刪除成功")); // catch 交給外層的 errorHandle 處理
  return await schemaModel.find();
}

export async function deleteManyDB(schemaModel) {
  await DBConnect();
  await  schemaModel.deleteMany({})
    .then(() => console.log("全部刪除成功"));
  return await schemaModel.find();
}
