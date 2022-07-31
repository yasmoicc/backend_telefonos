const mongoose = require('mongoose')

 const connectionString = process.env.MONGODB_URI

 mongoose.connect(connectionString)
 .then(result => {
    console.log('Conected')
 })
 .catch(error =>{
    console.log(error)
 })
 
