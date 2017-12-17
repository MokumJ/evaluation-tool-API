const router = require('express').Router()
const { Batch } = require('../models')
const passport = require('../config/auth')

const authenticate = passport.authorize('jwt', {session: false})


router.get('/batches', authenticate, (req, res, next) => {
  Batch.find()
    .sort({ createdAt: -1 })
    .then((batches) => res.json(batches))
    .catch((error) => next(error))

  })
  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })

  .post('/batches', authenticate, (req, res, next) => {
      let newBatch = req.body
      newBatch.authorId = req.account._id

      Batch.create(newBatch)
        .then((batch) => res.json(batch))
        .catch((error) => next(error))
    })
    .put('/batches/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const getEvaluation = req.body.evaluation
      const studentId = req.body.studentId
      const currentStudent = req.body.student

      Batch.findById(id)
        .then((batch) => {
          if(!batch) {return next()}


        const newStudents =  batch.students.map(student => {
            if ( student._id == currentStudent._id) {

              student.evaluation.push(getEvaluation)
            }
          return student
        })





        console.log(newStudents)

          const updatedBatch = {
            ...batch,
            students: newStudents,

          }

          Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
            .then((batch) => res.json(batch))
            .catch((error) => next(error))
        })
      .catch((error) => next(error))
  })

    .patch('/batches/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const patchStudent = req.body.student

      Batch.findById(id)
        .then((batch) => {
          if(!batch) {return next()}

          let newStudents = batch.students

				newStudents.push({
					name: req.body.name,
					picture: req.body.picture,
					batchId: req.body.batchId,
					evaluation: req.body.evaluation,

				});

				const updatedBatch = {
					...batch,
					students: newStudents
				};

          Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
            .then((batch) => res.json(batch))
            .catch((error) => next(error))
        })
      .catch((error) => next(error))
      })

  .delete('/batches/:id_batch/:id_student', authenticate, (req, res, next) => {
      const id_batch = req.params.id_batch
      const id_student = req.params.id_student


      Batch.findById(id_batch)
        .then((batch) => {
          if(!batch) {return next()}

          const updatedStudents = batch.students.filter(function(student) {
            return student._id != id_student
          });

          console.log(updatedStudents)
          const updatedBatch = {
            ...batch,
            students: updatedStudents
          }

          Batch.findByIdAndUpdate(id_batch, { $set: updatedBatch }, { new: true })
            .then((batch) => res.json(batch))
            .catch((error) => next(error))

    })
    .catch((error) => next(error))
  })


module.exports = router
