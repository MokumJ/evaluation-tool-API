const mongoose = require('../config/database')
const { Schema } = mongoose
const students = require('./student').schema


const batchSchema = new Schema({
  batchNumber: { type: Number, required: true},
  startDate: { type: Date, default: Date.now , required: true },
  endDate: { type: Date, default: Date.now , required: true },
  students: [students],
  pickStudent: [String],
})

module.exports = mongoose.model('batches', batchSchema)
