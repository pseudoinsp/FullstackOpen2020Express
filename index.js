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

app.get('/api/persons/:id', (req, res, next) => {
    console.log(req.params.id)
    Person.findById(req.params.id)
          .then(person => {
            person ? res.json(person) : res.status(404).end()
          })
          .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const personDTO = {...req.body}

    const personUpdate = {
      name: personDTO.name,
      number: personDTO.number
    }

    Person.findByIdAndUpdate(req.params.id, personUpdate, { new: true})
          .then(updatedPerson => {
            updatedPerson ? res.json(updatedPerson) : res.status(404).end()
          })
          .catch(error => next(error))

})

app.post('/api/persons', (req, res, next) => {
    const personDTO = {...req.body}
    console.log(personDTO)

    if(!personDTO.name || !personDTO.number) {
        return res.status(400).json({
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
                    res.json(savedNote)})
                  .catch(error => next(error))
  })

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})