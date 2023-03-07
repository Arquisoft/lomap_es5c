const express = require('express');
//const check = require('express-validator');

const Place = require('../models/Place');

var randomstring = require("randomstring"); 

module.exports.findPlacesById = async(req, res) => {
    const places = await Place.find( {idPlace: req.params.id})
    return res.json(places);
}; 

module.exports.addPlace = async(req, res) => {
  try{
    let place = new Place();
      place.idPlace = randomstring.generate();
      //para hardcodear: place.idPlace = req.body.idPlace;
      place.name = req.body.name;
      place.latitude = req.body.latitude;
      place.longitude = req.body.longitude;
    
    await place.save();
      res.send("Added the place correctly.");
  }catch {
    res.send("Failed to add a place.");
  }
}; 

module.exports.findAllPlaces = async(req, res) => {
  const places = await Place.find({})
  return res.json(places);
};
