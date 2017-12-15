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

    var green = students.filter(student => student.currentColor === 2)
    var yellow = students.filter(student => student.currentColor === 1)
    var red = students.filter(student => student.currentColor === 0)
    var pickStudent = req.body.pickStudent
    var student = {}


    function pick() {
      if (odds(pickStudent, "red") / pickStudent.length < 0.5 && red.length > 0) {pick_student(red)}
      else if (odds(pickStudent, "yellow") / pickStudent.length < 0.33 && yellow.length > 0) {pick_student(yellow)}
      else {pick_student(green)}

      function rand(currentColor) {
      var rand = Math.floor(Math.random() * (currentColor.length))
           pickStudent.push(currentColor[rand])
           student = currentColor[rand]
         }

      }

      pick()
      updatedBatch.pickStudent = pickStudent

    Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
       .then((batch) => res.json(student))
       .catch((error) => next(error))
  })


module.exports = router
