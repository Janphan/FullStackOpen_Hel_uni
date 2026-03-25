const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()

const Person = require('./models/persons')

//Middleware pre-processes requests before they reach the route handlers
app.use(cors());
app.use(express.static('dist'))
app.use(express.json())

//Route handlers
//info route
app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments({}).then(count => {
        response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
})
//get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
//add new person
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

//get person by id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
})
//delete person by id
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error));
})
//update person by id
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (!updatedPerson) {
                return response.status(404).end()
            }
            response.json(updatedPerson)
        }).catch(error => next(error))
}
)

//Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        console.error('malformatted id:', error.value)
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})