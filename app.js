const express = require("express");
const app  = express();
const fs = require("fs")
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send("hello from the server side")
// })
// app.post("/",(req, res) => {
//   res.send("yo can post ")
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get("/api/v1/tours", (req,res) => {
  res.status(200).json({status: "success", results: tours.length, data: {tours}})
})
app.get("/api/v1/tours/:id", (req,res) => {
  console.log(req.params)
  res.status(200).json({status: "success"})
})
app.post("/api/v1/tours", (req,res) => {
  // console.log(req.body)
  const newId = tours[tours.length -1].id + 1
  const newTour = Object.assign({id: newId}, req.body)
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  })
  // res.send("Done")
})
const port = 3000
app.listen(port, () => {
  console.log("App runnig on port")
})