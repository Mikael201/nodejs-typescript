const mongoose = require('mongoose')
require('dotenv').config();
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGO_URI

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB successfully!')
    })
    .catch((error: any) => {
        console.log('error connecting to MongoDB', error.message)
    })
mongoose.set('useFindAndModify', false)
const noteSchema = new mongoose.Schema({
    id: Number,
    title: String,
    body: String,
    writer: String
  })

  noteSchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  noteSchema.plugin(uniqueValidator);
  module.exports = mongoose.model('Note', noteSchema)