const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const number_persons = persons.length;
    const currentDate = new Date();
    response.send(`
        <p>Phonebook has info for ${number_persons} people!</p>
        <p>${currentDate}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)


    if (person) {
        response.json(person)
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).send({ messsage: `Person id ' {id} 'delete` });
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        content: body.name,
        number: body.number,
        id: generateId(),
    }

    const duplicateName = persons.find(person => person.name === body.name);
    const duplicateNumber = persons.find(person => person.number === body.number);

    if (duplicateName || duplicateNumber) {
        return response.status(400).json({ error: 'Name or number must be unique' });
    }

    persons = persons.concat(person)

    response.json(person)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) 