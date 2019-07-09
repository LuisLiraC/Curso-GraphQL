const connectdb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      let peopleData

      try {
        const db = await connectdb()
        const ids = people ? people.map(_id => ObjectID(_id)) : []
        peopleData = ids.length > 0 ? await db.collection('students').find({ _id: { $in: ids } }).toArray() : []
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  }
}
