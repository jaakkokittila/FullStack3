const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = `mongodb+srv://fullstack:<Salasana>@cluster0-miwda.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useFindAndModify : false })

const contactSchema = new mongoose.Schema({
  name: {
    type : String,
    minlength : 3,
    required : true,
    unique : true
  },
  number: {
    type : String,
    minlength : 8,
    required : true,
    unique : true
  },
  id: 'Number',
})

contactSchema.plugin(uniqueValidator)
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})





module.exports = mongoose.model('Contact', contactSchema)
