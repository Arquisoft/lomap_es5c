import request, { Response } from "supertest";
import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import cors from "cors";
const api = require('../routes/routes');

let app: Application;
let server: http.Server;

//Conexion con base de datos mongo 
const mongoose = require("mongoose");
const uri ='mongodb+srv://ferjglez:2kKAa7w5WM2xbiIH@ejemplo.pwwsxsn.mongodb.net/prueba'

beforeAll(async () => {
  app = express();
  const port: number = 5001;
  const options: cors.CorsOptions = {
    origin: ["http://localhost:3000"],
  };
  app.use(cors(options));
  app.use(bp.json());
  app.use("/api", api);

  server = app
    .listen(port, (): void => {
      console.log("Restapi server for testing listening on " + port);
    })
    .on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });


  mongoose.connect(uri)
    .then(() => {
            console.log('Conexion correcta a la BD')
    }).catch((err:any) => {
        console.log(err)
    })
});

afterAll(async () => {
  server.close(); //close the server
  mongoose.connection.close(); //close de connection to mongodb
});

/**
 * Describe para cada tabla  y dentro el it cada tests o metodo que quiera testear
 */

describe("user ", () => {
  /**
   * Test that we can list users without any error.
   */
  it("can be listed", async () => {
    const response: Response = await request(app).get("/api/users/list");
    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that a user can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async () => {
    let username: string = "Pablo";
    let email: string = "gonzalezgpablo@uniovi.es";
    const response: Response = await request(app)
      .post("/api/users/add")
      .send({ name: username, email: email })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });


});
