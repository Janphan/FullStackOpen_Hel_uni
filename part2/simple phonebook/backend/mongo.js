const mongoose = require('mongoose')
const dns = require('dns')
// Force Node to use public resolvers when local router DNS fails SRV lookups.
dns.setServers(['8.8.8.8', '1.1.1.1'])

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv.slice(3, process.argv.length - 1).join(' ')
const number = process.argv[process.argv.length - 1]

const uri = `mongodb+srv://fullstack:${password}@cluster0.pwv6vqv.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false)

//Define Schema and Model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

//Handle connection and operations
mongoose.connect(uri, { family: 4 })
    .then(() => {
        if (process.argv.length === 3) {
            console.log('phonebook:')
            return Person.find({})
        } else {
            const person = new Person({
                name: name,
                number: number,
            })
            return person.save()
        }
    })
    .then(result => {
        if (Array.isArray(result)) {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        } else {
            console.log(`added ${result.name} with number ${result.number} to phonebook`)
        }
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

// mongoose.connection.close()