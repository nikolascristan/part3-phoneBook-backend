const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)