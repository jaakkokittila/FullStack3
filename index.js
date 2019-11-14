const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan(':method :response-time :url :status :post'))
app.use(bodyParser.json())

morgan.token('post', function getData(req) {
  if(req.body !== null){
    return JSON.stringify(req.body)
  }
 
})

let contacts = [
    {
        "persons": [
          { name: 'Arto Hellas', number: '040-123456' , id : 1},
          { name: 'Ada Lovelace', number: '39-44-5323523', id : 2 },
          { name: 'Dan Abramov', number: '12-43-234345', id : 3 },
          { name: 'Mary Poppendieck', number: '39-23-6423122', id : 4 }
        ]
      }
]



app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

app.get('/info', (req, res) => {
    const date = new Date()
    
    res.send(`<p>Phonebook has info for ${contacts[0].persons.length} people</p> <p>${date}</p>`)
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts[0].persons = contacts[0].persons.filter(contact => contact.id !== id)
    console.log(contacts)
  
    res.status(204).end()
  })

app.get('/api/persons/:id', (req, res) => {
    
    const id = Number(req.params.id)
    const contact = contacts[0].persons.find(contact => contact.id === id)
    if(contact){
        res.json(contact)
    }else{
        res.status(404).end()
    }
   
})

app.post('/api/persons', (req, res) => {
    const newContact = req.body

 
    if(newContact.name == null || newContact.number == null){
      return res.status(400).json({
        error: "Nimi tai numero puuttuu"
      })
    }

    const names = contacts[0].persons.map(person => person.name.toLowerCase())
    const contains = names.includes(newContact.name.toLowerCase())

    if(contains){
      return res.status(400).json({
        error: "Nimi löytyy jo luettelosta"
      })
    }else{
     
      const id = Math.floor(Math.random() * 10000)
      const finalContact = {
        name : newContact.name,
        number : newContact.number,
        id: id
      }
      contacts[0].persons = contacts[0].persons.concat(finalContact)
  
      res.json(finalContact)
    }
    
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })