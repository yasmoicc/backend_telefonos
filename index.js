const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


let people = [
    {
        id: 1,
        nombre: "Yasmany",
        telefono: "4029402395"
    },
    {
        id: 2,
        nombre: "Lazara",
        telefono: "4029405858"
    }
]

app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${people.length} people</h1><p>${new Date()}</p>`)
})

//get all records
app.get('/api/guiatelefonica', (request, response) => {
  response.json(people)
})
//function to create the id
const generateId = () => {
    const maxId = people.length > 0
      ? Math.max(...people.map(n => n.id))
      : 0
    return maxId + 1
  }

//create a new record
app.post('/api/telefono', (request, response) => {    
    const body = request.body
    //console.log(request.body)
    if (!body) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    
      const recordperson = {
        name: body.name,
        telefono: body.telefono,
        id: generateId()
      }

      people = people.concat(recordperson)
    response.json(recordperson)
    
  })

  //get a record
  app.get('/api/guiatelefonica/:id', (request, response) => {
    
    const id = Number(request.params.id)
    const person = people.find(p => p.id === id)
    //console.log(person)
    if(person)
    {
        response.json(person)
    }else
    {
        response.status(404).end()
    }
})

//delete a record
app.delete('/api/guiatelefonica/:id', (request, response) => {
    const id = Number(request.params.id)
    person = people.filter(p => p.id !== id)
    console.log(person)
    response.status(204).end()
  })
 
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})