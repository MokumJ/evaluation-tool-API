const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  color: { type: String, default: "green" },
  date: { type: Date, default: Date.now },
  context: { type: String, default: false },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'batches' }
});



module.exports = mongoose.model('students', studentSchema)
