const connectdb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {

  // COURSES
  getCourses: async () => {
    let courses = []

    try {
      const db = await connectdb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      console.error(error)
    }

    return courses
  },
  getCourse: async (root, { id }) => {
    let course

    try {
      const db = await connectdb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
    } catch (error) {
      console.error(error)
    }

    return course
  },

  // STUDENTS
  getStudents: async () => {
    let students = []

    try {
      const db = await connectdb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      console.error(error)
    }

    return students
  },
  getStudent: async (root, { id }) => {
    let student

    try {
      const db = await connectdb()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      console.error(error)
    }

    return student
  }

}
