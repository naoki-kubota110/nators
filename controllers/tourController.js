const Tour = require("./../models/tourModel")

exports.getAllTours = async (req,res) => {
  try{
    // console.log(req.query)
    //1) Filtering
    const queryObj = {...req.query}
    const excludeedFields = ["page", "sort", "limit", "fields"]
    excludeedFields.forEach(el => delete  queryObj[el])

    //2) Advansed Filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr  = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`)
    console.log(JSON.parse(queryStr))
    let query = Tour.find(JSON.parse(queryStr))
    //3) sorting
    if(req.query.sort){
      query = query.sort(req.query.sort)
    }
    const tours = await query


    // const tours = await Tour.find().where("duration").equals(5).where("difficulty").equals("easy")
    console.log(req.requestTime)
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours
      }
    })
  } catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
  }
exports.getTour =  async (req,res) => {
  try{
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: "success", 
      data: {tour}
    })
  } catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
  // const tour = tours.find(el => el.id === id)
  // res.status(200).json({status: "success", results: tours.length, data: {tour}})
}

exports.createTour = async (req,res) => {
  try{

    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "success",
      data:{
        tour : newTour
      }
    })
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
}
  exports.updateTour = async(req,res) => {
    try{
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
      })
      res.status(200).json({
        status: "success",
        data: {tour}
      })

    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      })
    }
  }

  exports.deleteTour = async(req,res) => {
    try{
      await Tour.findByIdAndDelete(req.params.id)
      res.status(204).json({
        status: "success",
        data: null
      })
    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      })
    }
  }
