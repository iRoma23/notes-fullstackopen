const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

console.log(process.argv)

const password = process.argv[2]

const url = `mongodb+srv://romadev:${password}@cluster0.gzb004o.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  // .then((result) => {
  //   console.log('connected')

  //   const note = new Note({
  //     content: 'HTML is Easy',
  //     date: new Date(),
  //     important: true,
  //   })

  //   return note.save()
  // })
  // .then((result) => {
  //   console.log('note saved!')
  //   console.log(result)
  //   return mongoose.connection.close()
  // })
  .then(() => {
    return Note.find({})
  })
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))