//データベース構造、エラーハンドリング、環境変数

const app = require("./app")

//4)Start Server
const port = 3000;
app.listen(port, () => {
  console.log("App runnig on port")
})

