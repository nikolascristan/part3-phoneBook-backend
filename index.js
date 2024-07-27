const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
  const peopleCount = persons.length
  console.log(peopleCount)
  const currentDate = new Date()
  console.log(currentDate)

  const pageInfo =`
  <p>Phonebook has info for ${peopleCount}</p>
  <p>${currentDate}</p>
  `
  response.send(pageInfo)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(persons => persons.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(persons => persons.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newID = persons.length > 0 
  ? Math.floor(Math.random() * 1000000)
  :5

  const person = request.body
  console.log(person)
  person.id = String(newID)
  console.log(person)
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)