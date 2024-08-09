const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
//const static = require('static')
const app = express()
const Person = require('./models/person')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//Local info route
/*app.get('/info', (request, response) => {
  const peopleCount = persons.length
  console.log(peopleCount)
  const currentDate = new Date()
  console.log(`testing ${currentDate}`)

  const pageInfo =`
  <p>Phonebook has info for ${peopleCount}</p>
  <p>${currentDate}</p>
  `
  response.send(pageInfo)
})*/

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, reponse) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      reponse.status(204).end()
  })
    //.catch(error => next(error))
})

//Local delete route
/*app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(persons => persons.id !== id)

  response.status(204).end()
})*/

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name && !body.number) {
    return response.status(400).json({ error: 'name or number missing'})
  }

  const person = new Person({
    name: `${body.name}`,
    number: `${body.number}`
})

person.save().then(savedPerson => {
  response.json(savedPerson)
})

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})