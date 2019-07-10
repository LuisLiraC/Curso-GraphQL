const connectdb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {

  // COURSES
  getCourses: async () => {
    let courses = []

    try {
      const db = await connectdb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return courses
  },
  getCourse: async (root, { id }) => {
    let course

    try {
      const db = await connectdb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },

  // PEOPLE
  getPeople: async () => {
    let students = []

    try {
      const db = await connectdb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return students
  },
  getPerson: async (root, { id }) => {
    let student

    try {
      const db = await connectdb()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  searchItems: async (root, { keyword }) => {
    let items = []

    try {
      const db = await connectdb()
      const courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
      const people = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
      items = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }

    return items
  }

}
