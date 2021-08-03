//データベース構造、エラーハンドリング、環境変数
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
const app = require("./app")
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("DB connection successful")
})

//4)Start Server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("App runnig on port")
})

