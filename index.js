const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact.js')


app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :response-time :url :status :post'))
app.use(bodyParser.json())

morgan.token('post', function getData(req) {
  if(req.body !== null){
    return JSON.stringify(req.body)
  }
 
})





app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
    
  })
})

app.get('/info', (req, res) => {
    const date = new Date()
    Contact.find({}).then(result => {
      res.send(`<p>Phonebook has info for ${result.length} people</p> <p>${date}</p>`)
    })
    
    
  })

  app.delete('/api/persons/:id', (req, res) => {
    console.log(req.params.id)
    
    
    Contact.findByIdAndRemove(req.params.id).then(() =>{
      return res.status(204).end()
      
    }
      
    ).catch(error =>{
      console.log(error)
    })
    
    
  
 
  })

app.get('/api/persons/:id', (req, res) => {
    
    Contact.findById(req.params.id).then(contact => {
      res.json(contact.toJSON())
    }).catch(error =>{
      res.status(404).end()
    })
    
   
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)

  const contact = new Contact({
    name: body.name,
    number: body.number,
    id : Math.floor(Math.random() * 1000)
  })

  contact.save().then(savedContact => {
    res.json(savedContact.toJSON())
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  
  const contact = {
    name: body.name,
    number: body.number
  }
 
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact.toJSON())
    })
    .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else{
    console.log(error)
  }
  next(error)

}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })