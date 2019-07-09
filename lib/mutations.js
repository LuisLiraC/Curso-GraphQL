const connectdb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {

  // COURSES
  createCourse: async (root, { input }) => {
    const defaults = { teacher: '', topic: '' }
    let course

    const newCourse = Object.assign(defaults, input)

    try {
      const db = await connectdb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    let course

    try {
      const db = await connectdb()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let info

    try {
      const db = await connectdb()
      info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return info.deletedCount ? `El curso con ID: ${_id} ha sido eliminado` : `Hubo un error al tratar de eliminar`
  },

  // STUDENTS
  createStudent: async (root, { input }) => {
    let student

    try {
      const db = await connectdb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },
  editStudent: async (root, { _id, input }) => {
    let student

    try {
      const db = await connectdb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      student = await db.collection('students').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  deleteStudent: async (root, { _id }) => {
    let info

    try {
      const db = await connectdb()
      info = await db.collection('students').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return info.deletedCount ? `El alumno con ID: ${_id} ha sido eliminado` : `Hubo un error al tratar de eliminar`
  },
  addPeople: async (root, { courseID, personID }) => {
    let course

    try {
      const db = await connectdb()
      course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      const person = await db.collection('students').findOne({ _id: ObjectID(personID) })

      if (!course || !person) throw new Error('La persona o el curso no existe')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  }

}
