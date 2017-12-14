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

  .put('/students/:id', (req, res, next) => {
    const id = req.params.id
    Student.findById(id)
      .then((student) => {
        if (!student) { return next() }

        const newData = req.body

        student.update(newData)
          .then((updatedStudent) => {
            res.json(updatedStudent)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })

module.exports = router
