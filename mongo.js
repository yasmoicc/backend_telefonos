const mongoose = require('mongoose')

 const connectionString = 'mongodb+srv://yasmoicc:123@cluster0.whu6fpo.mongodb.net/telefonosBD?retryWrites=true&w=majority'

 mongoose.connect(connectionString)
 

 const personSchema = new mongoose.Schema({
    name: String,
    telefono: String
 })

 const newgente = mongoose.model('gente', personSchema)

