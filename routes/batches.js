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

    Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
       .then((batch) => res.json(student))
       .catch((error) => next(error))
  })


module.exports = router
