// models/student.js
const mongoose = require('../config/database')
const { Schema } = mongoose


const studentSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  vegan: { type: Boolean, default: false },
  vegetarian: { type: Boolean, default: false },
  pescatarian: { type: Boolean, default: false },
  cookingTime: { type: Number, required: false }, // in minutes
  ingredients: [ingredientSchema],
  cookingSteps: [cookingStepSchema],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('students', studentSchema)
