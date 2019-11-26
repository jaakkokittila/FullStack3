const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const password = process.argv[2]
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: 'Number',
})

contactSchema.plugin(uniqueValidator)

const Contact = mongoose.model('Contact', contactSchema)

const url = `mongodb+srv://fullstack:${password}@cluster0-miwda.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

if (process.argv.length > 3){
 

    

    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
        id: Math.floor(Math.random() * 1000)
    })

    contact.save().then(response => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    })

}else{
    console.log("phonebook")
     Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(contact.name + " "+ contact.number)
        })
        mongoose.connection.close()
      })
}