const express = require('express');
const db = require('./db');

var router = express.Router();

// Cars
router.get('/cars', db.car.getCars);
router.get('/cars/:id', db.car.getCar);
router.post('/cars', db.car.createCar);
router.put('/cars', db.car.updateCar);
router.delete('/cars/:id', db.car.deleteCar);

// Colors
router.get('/colors', db.color.getColors);
router.get('/colors/:id', db.color.getColor);
router.post('/colors', db.color.createColor);
router.put('/colors', db.color.updateColor);
router.delete('/colors/:id', db.color.deleteColor);

// Users
router.get('/users', db.user.getUsers);
router.get('/users/:id', db.user.getUser);
router.post('/users', db.user.createUser);
router.put('/users', db.user.updateUser);
router.delete('/users/:id', db.user.deleteUser);

module.exports = router;
