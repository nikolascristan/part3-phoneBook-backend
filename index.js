const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


function areTheseObjectsEqual(first, second) {
  "use strict";

  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  if (first.constructor !== second.constructor) {
    return false;
  }

  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  if (first instanceof Date) return false;

  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  const firstKeys = Object.keys(first);
  const allKeysExist = Object.keys(second).every(
    (i) => firstKeys.indexOf(i) !== -1
  );

  const allKeyValuesMatch = firstKeys.every((i) =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

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
  console.log(`testing ${currentDate}`)

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
  person.id = String(newID)
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'Name or Number missing'
    })
  }
  const nameExists = persons.some(element => areTheseObjectsEqual(element.name, person.name))
  const numberExists = persons.some(element => areTheseObjectsEqual(element.number, person.number))
    if(!nameExists && !numberExists) {
      persons = persons.concat(person)
      response.status(201).json(person)
    } else { response.status(400).json({
      error: 'Name or Number already exist'
    })
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)