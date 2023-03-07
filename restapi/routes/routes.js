const express = require('express');
const placeController= require('../controllers/PlaceController');

const api = express.Router();


//GET A PLACE BY ID
api.get('/list/:id', placeController.findPlacesById);

//ADD A NEW PLACE
api.post('/add', placeController.addPlace);

api.get('/list', placeController.findAllPlaces);

module.exports = api;