const express = require('express');
const placeController= require('../controllers/PlaceController');

const api = express.Router();


//GET A PLACE BY ID
api.get('/list/:id', placeController.findPlacesById);

//ADD A NEW PLACE
api.post('/add', placeController.addPlace);

//DELETE A NEW PLACE
api.get('/delete/:id', placeController.deletePlaceById);

api.get('/list', placeController.findAllPlaces);

module.exports = api;