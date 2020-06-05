const mongoose = require('mongoose')

if(process.argv.length !== 5 && process.argv.length !== 3)
{
    console.log('Enter a password, and optionally an initial user and phonenumber.')
    process.exit(1)
}

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0-zrc6g.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema= new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3)
{
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else
{
    const newPersonName = process.argv[3]
    const newPersonPhone = process.argv[4]

    const person = new Person({
        id: randomInteger(1, 2048394853495),
        name: newPersonName,
        number: newPersonPhone
    })

    person.save().then(() => {
        console.log(`added ${newPersonName} number ${newPersonPhone} to phonebook`)
        mongoose.connection.close()
    })
}

