const format = require('pg-format');
const queries = require('../queries');
const postgres = require('../postgres');
const serializers = require('../serializers');

// TO DO SERIALIZERS
exports.getCars = async function(request, response) {
  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const cars = await postgres.query(response, queries.car.getCars, [], 'failed to get cars', client);
  const carColors = await postgres.query(response, queries.carHasColor.getAll, [], 'failed to get car colors', client);
  const colors = await postgres.query(response, queries.color.getColors, [], 'failed to get car colors', client);
  
  if (!cars) return;
  if (!colors) colors = [];
  if (!carColors) carColors = [];

  if (cars.length) {
    response.json(serializers.car.serialize(cars, colors, carColors));
  }

  else response.json({error: 'no car found'});
  
  await client.end();
}

exports.getCar = async function(req, response) {
  const car_id = req.params['id'];

  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const cars = await postgres.query(response, queries.car.getCar, [car_id], 'failed to get car', client);
  const colors = await postgres.query(response, queries.color.getColorsFromCarId, [car_id], 'failed to get car colors', client);

  if (!cars) return;
  if (!colors) colors = [];
  
  const car = serializers.car.serialize(cars, colors)[0];
  response.json(car);
  await client.end();
}

exports.createCar = async function(req, response) {
  const name = req.body['name'];
  const colorIds = req.body['colorIds'].map(color_id => color_id);

  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const cars = await postgres.query(response, queries.car.createCar, [name], 'failed to create car', client);
  
  const ids = req.body['colorIds'].map(color_id => [cars[0].car_id, color_id]);
  await postgres.query(response, format(queries.carHasColor.createMultiple, ids), [], 'failed to create car colors', client);
  const colors = await postgres.query(response, format(queries.color.getColorsFromColorIds, colorIds), [], 'failed to get car colors', client);
  
  if (!cars) return;
  if (!colors) colors = [];

  const car = serializers.car.serialize(cars, colors)[0];
  response.json(car);
  await client.end();
}

exports.updateCar = async function(req, response) {
  const car_id = req.body['car_id'];
  const name = req.body['name'];
  const colorIds = req.body['colorIds'].map(color_id => color_id);
  const ids = req.body['colorIds'].map(color_id => [car_id, color_id]);
  
  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const cars = await postgres.query(response, queries.car.updateCar, [name, car_id], 'failed to update car', client);
  await postgres.query(response, queries.carHasColor.delete, [car_id], 'failed to reinitialize car colors', client);
  await postgres.query(response, format(queries.carHasColor.createMultiple, ids), [], 'failed to update car colors', client);
  const colors = await postgres.query(response, format(queries.color.getColorsFromColorIds, colorIds), [], 'failed to get car colors', client);
  
   if (!cars) return;
   if (!colors) colors = [];

  const car = serializers.car.serialize(cars, colors)[0]
  response.json(car);
  await client.end();
}

exports.deleteCar = async function(req, response) {
  const car_id = req.params['id'];

  const client =  await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const cars = await postgres.query(response, queries.car.deleteCar, [car_id], 'failed to delete car', client);
  await postgres.query(response, queries.carHasColor.delete, [car_id], 'failed to delete car colors', client);
  const colors = await postgres.query(response, queries.color.getColorsFromCarId, [car_id], 'failed to get car colors', client);

  if (!cars) return;
  if (!colors) colors = [];
  
  const car = serializers.car.serialize(cars, colors)[0]
  response.json(car);
  await client.end();
}