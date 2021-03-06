const fs = require("fs")
const express = require("express");
const morgan  = require("morgan")
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")
const app  = express();
//1) middleware 
if(process.env.NODE_ENV === "development"){
  console.log(process.env.NODE_ENV)
  app.use(morgan("dev"))
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next) => {
  console.log("hello from the middleware")
  next()
})

app.use((req,res,next) => {
  req.requestTime = new Date().toISOString()
  next()
})

//3)Routes
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
  
module.exports = app