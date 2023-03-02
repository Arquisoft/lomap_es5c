require('dotenv').config(); //File .env
const cors = require('cors');
const express = require('express');
const bp = require('body-parser');

const mongoose = require('mongoose');

const promBundle = require('express-prom-bundle');
const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL; //Creates a valid conection 
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database MongoDB Connected');
})

const app = express();
const port = 5000;

const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.urlencoded({ extended: true }));

app.use("/api", routes);

app
  .listen(port, ()=> {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error) => {
    console.error("Error occured: " + error.message);
  });
