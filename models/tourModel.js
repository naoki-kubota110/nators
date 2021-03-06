const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have name"],
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"]
  },
  maxGroupSize:{
    type: Number,
    required: [true, "A tour must have group size"]
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty"]
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "A tour must have price"],
    unique: true
  },
  priceDiscount: Number,
  summary: {
    type: String,
    tirm:  true,
    required: [true, "A tour must have description"]
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, "Tour must have a cover image"]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
})

const Tour = mongoose.model("Tour", tourSchema)
module.exports = Tour