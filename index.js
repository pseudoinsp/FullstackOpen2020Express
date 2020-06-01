require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
morgan.token('requestbody', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbody'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "asd",
        "number": "45345",
        "id": 5
      }
]

app.use(express.static('build'))

const ComposeServerInfo = () => {
    return `Phonebook has info for ${persons.length} people <br/> <br/> 
            ${new Date()}`
}

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(ComposeServerInfo())
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const personDTO = {...request.body}
    console.log(personDTO)

    if(!personDTO.name || !personDTO.number) {
        return response.status(400).json({
            error: "name or id is missing"
        })            
    }

    // if(persons.map(p => p.name).includes(person.name)) {  
    //     return response.status(400).json({
    //         error: "name has already been added"
    //     })    
    // }

    const person = new Person({
      id: randomInteger(1, 2048394853495),
      name: personDTO.name,
      number: personDTO.number
    })

    person.save().then(savedNote => {
        console.log(`added ${savedNote.name} number ${savedNote.number} to phonebook`)
        response.json(savedNote)
    })
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})