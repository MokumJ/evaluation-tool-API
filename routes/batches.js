const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  Batch.find()
    .sort({ createdAt: -1 })
    .then((batches) => res.json(batches))
    .catch((error) => next(error))
  })

  .get('/batches/:id', (req, res, next) => {
   const id = req.params.id

  Student.find({ batchId: id})
     .then((student) => {
   Batch.findById(id)
     .then((batch) => {
       if (!batch) { return next() }
       batch.students = student
       batch.save()
       res.json(batch)
     })
     .catch((error) => next(error))
 })
 })

  .post('/batches', authenticate, (req, res, next) => {
    let newBatch = req.body

    Batch.create(newBatch)
      .then((batch) => res.json(batch))
      .catch((error) => next(error))
  })

  .put('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const students = req.body.students
    var updatedBatch = req.body

    var green = students.filter(student => student.evaluations[student.evaluations.length-1].color === 2)
    var yellow = students.filter(student => student.evaluations[student.evaluations.length-1].color === 1)
    var red = students.filter(student => student.evaluations[student.evaluations.length-1].color === 0)
    var pickStudent = req.body.pickStudent
    var student = {}

      function pick_student(color) {
      var num = Math.floor(Math.random() * (color.length))
           pickStudent.push(color[num].evaluations[color[num].evaluations.length-1].color)
           student = color[num]}

      function odds(pickStudent, color) {
        return pickStudent.filter(pick => pick === color).length
      }

      function pick() {
        if (pickStudent.length < 2 && red.length > 0) { picks_student(red) }
        else {
        if (odds(pickStudent, "red") / pickStudent.length < 0.5 && red.length > 0) {picks_student(red)}
        else if (odds(pickStudent, "yellow") / pickStudent.length < 0.33 && yellow.length > 0) {picks_student(yellow)}
        else {picks_student(green)}
      }
      }

      pick()
      updatedBatch.pickStudent = pickStudent

    Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
       .then((batch) => res.json(student))
       .catch((error) => next(error))
  })


module.exports = router
