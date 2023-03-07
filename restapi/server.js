require('dotenv').config(); //File .env
const cors = require('cors');
const express = require('express');
const bp = require('body-parser');

const mongoose = require('mongoose');

const promBundle = require('express-prom-bundle');

const route = require('./routes/routes');
const routeComment = require('./routes/post/CommentRoutes');
const routePhoto = require('./routes/post/PhotoRoutes');
const routeScore = require('./routes/post/ScoreRoutes');

let database = require("./persistence/mongoDB");

const app = express();
const port = 5000;

const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.urlencoded({ extended: true }));

app.use("/place", route);
app.use("/comment", routeComment);
app.use("/photo", routePhoto);
app.use("/score", routeScore);

app
  .listen(port, ()=> {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error) => {
    console.error("Error occured: " + error.message);
  });
