// routes/students.js
const router = require('express').Router()
const { Batch, Student } = require('../models')
const passport = require('../config/auth')

const authenticate = passport.authorize('jwt', { session: false })




  router.get('/students/:id', authenticate, (req, res, next) => {
        const id = req.params.id

         Student.findById(id)
          .then((student) => {
            if (!student) { return next() }
            res.json(student)
          })
          .catch((error) => next(error))
})
  .get('/students/:id', (req, res, next) => {
    const id = req.params.id
    Student.findById(id)
      .then((student) => {
        if (!student) { return next() }
        res.json(student)
      })
      .catch((error) => next(error))
  })
  .post('/students', authenticate, (req, res, next) => {
      let newStudent = req.body

      Student.create(newStudent)
       .then((student) => res.json(student))
       .catch((error) => next(error))
     })
  .put('/students/:id', authenticate, (req, res, next) => {
        const id = req.params.id




         Student.findByIdAndUpdate(id, { $set: evaluateStudent }, { new: true })
           .then((student) => res.json(student))
           .catch((error) => next(error))
        })

      .patch('/students/:id', authenticate, (req, res, next) => {
        const id = req.params.id
        const evaluateStudent = req.body

        Student.findById(id)
         .then((student) => {
           if (!student) { return next() }

           student.evaluation.unshift(evaluateStudent)

           student.currentColor = (student.studentEval.sort({ date: 1})[student.evaluation.length - 1].color)


           Student.findByIdAndUpdate(id, { $set: student }, { new: true })
             .then((student) => res.json(student))
             .catch((error) => next(error))
         })
         .catch((error) => next(error))
    })

    .delete('/students/:id', authenticate, (req, res, next) => {
      const id = req.params.id

        Student.findByIdAndRemove(id)
           .then(() => {
                 res.status = 200
                 res.json({
                   message: 'Removed',
                   _id: id
                 })
               })
           .catch((error) => next(error))
       })



    module.exports = router
