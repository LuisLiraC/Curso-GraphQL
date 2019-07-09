const connectdb = require('./db')

module.exports = {

  createCourse: async (root, { input }) => {
    const defaults = { teacher: '', topic: '' }
    let course

    const newCourse = Object.assign(defaults, input)
    
    try {
      const db = await connectdb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }

    return newCourse
  }

}
