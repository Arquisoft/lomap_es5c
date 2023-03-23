const express = require('express');
//const check = require('express-validator');

const Model = require('../../models/post/Score');

const api = express.Router();


//GET
api.get('/', async(req,res) => {
  res.json({message: "Welcome to my Api"});
});

//POST GENERICO
api.post("/post", (req, res) => {
  let data = req.body;
  res.send("Data received: " + JSON.stringify(data));
})

//POST CON UN MODELO
api.post(
  "/add", //Check of the parameters in the body of the petition
  async (req, res) => {
    const data = new Model({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }) //Store the information in an already defined model

    try { 
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }
);

//GETALL
api.get('/getAll', async (req, res) => {
  try{
      const data = await Model.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

module.exports = api;