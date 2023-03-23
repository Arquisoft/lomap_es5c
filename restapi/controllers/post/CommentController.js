const express = require('express');
//const check = require('express-validator');

const Comment = require('../../models/post/Comment');

const api = express.Router();

export const findCommentsByUser = async(req, res) => {
    const comments = await Comment.find( {idUser: req.params.id})
    return res.json(pedidos);
}

//GET
api.get('/', async(req,res) => {
  res.json({message: "Welcome to my Api"});
});

//POST GENERICO
api.post("/add", (req, res) => {
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