const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./data/mongo')
const app = express()
app.use(express.json())
app.use(cors())

const newgente = require('./models/newperson')





app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${people.length} people</h1><p>${new Date()}</p>`)
})

//get all records
app.get('/api/guiatelefonica', (request, response) => {
  newgente.find({}).then( people => {
    response.json(people)
  })
})
//function to create the id
const generateId = () => {
    const maxId = people.length > 0
      ? Math.max(...people.map(n => n.id))
      : 0
    return maxId + 1
  }

//create a new record
app.post('/api/telefono', (request, response, next) => {    
    const body = request.body
    //console.log(request.body)
    if (!body) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
      const persona = new newgente({
        name: body.name,
        telefono: body.telefono

      })

      persona.save().then(result => {
        response.json(result)
      })
    
  })

  //get a record
  app.get('/api/guiatelefonica/:id', (request, response, next) => {
    
    const id = request.params.id
    
    newgente.findById(id)
    .then(result => {
      if(result)
        response.json(result)
      else
        response.status(404).end()
    })
    .catch(error => next(error))
})

//delete a record
app.delete('/api/guiatelefonica/:id', (request, response) => {
    const id = request.params.id
    newgente.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

  app.put('/api/telefono/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      telefono: body.telefono,
    }
    console.log(person)
   
    newgente.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })
  
  app.use(errorHandler)
 
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

 

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})