const mongoose = require('mongoose');

//Needs a .env with a valid MongoDB => (DATABASE_URL= ...)
const mongoString = process.env.DATABASE_URL; //Creates a valid conection 
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database MongoDB Connected');
})