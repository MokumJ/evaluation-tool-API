const mongoose = require('../config/database')
const { Schema } = mongoose
import { studentSchema } from './student'


const batchSchema = new Schema({
  batchNumber: { type: Number, required: true},
  startDate: { type: Date, default: Date.now , required: true },
  endDate: { type: Date, default: Date.now , required: true },
  students: [students], // make students model

})

module.exports = mongoose.model('batches', batchSchema)
