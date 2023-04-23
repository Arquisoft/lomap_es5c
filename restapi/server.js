require("dotenv").config(); //File .env
const cors = require("cors");
const express = require("express");
const bp = require("body-parser");

const promBundle = require("express-prom-bundle");

const route = require("./routes/routes");

let database = require("./persistence/mongoDB");

const app = express();
const port = 5001;

const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors());

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.get("/aaa", cors(corsOptions), (req, res) => {
  res.json({ mensaje: "OK" });
});

app.use(bp.urlencoded({ extended: true }));

app.use("/place", route);

app
  .listen(port, () => {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error) => {
    console.error("Error occured: " + error.message);
  });
