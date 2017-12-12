// models/student.js
const mongoose = require('../config/database')
const { Schema } = mongoose


const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema],
  batchNo: [batchSchema],
});

const evaluationSchema = new Schema({
  color: { type: String, default: "green" },
  date: { type: Date, default: Date.now },
  context: { type: String, default: false },
});



module.exports = mongoose.model('students', studentSchema)
