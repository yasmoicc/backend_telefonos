const mongoose = require('mongoose')
 const personSchema = new mongoose.Schema({
    name: String,
    telefono: String
 })

 //Esta funcion es ara poder trabajar mejor con los ID de la base de datos de mongoose
 personSchema.set('toJSON', {
   transform: (document, returnedObject) => {
     returnedObject.id = returnedObject._id.toString()
     delete returnedObject._id
     delete returnedObject.__v
   }
 })

 const newgente = mongoose.model('gente', personSchema)

 module.exports = newgente