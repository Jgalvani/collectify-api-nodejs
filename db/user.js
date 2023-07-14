const postgres = require('../postgres');
const queries = require('../queries');
const serializers = require('../serializers');

// TO DO SERIALIZERS
exports.getUsers = async function(request, response) {
  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const users = await postgres.query(response, queries.user.getUsers, [], 'failed to get users', client);
  const cars = await postgres.query(response, queries.car.getCars, [], 'failed to get cars', client);
  const colors = await postgres.query(response, queries.color.getColors, [], 'failed to get colors', client);
  
  if (!users) return;
  if (!colors) colors = [];
  if (!cars) cars = [];
  
  if (users.length) {
    response.json(serializers.user.serialize(users, cars, colors));
  }

  else response.json({error: 'no user found'});
  
  await client.end();
}

exports.getUser = async function(req, response) {
  const client = await postgres.getClient();
  if (!client) {
    response.json({error: 'the connection to the database failed'});
    return;
  }

  const user_id = req.params['id'];

  const users = await postgres.query(response, queries.user.getUser, [user_id], 'failed to get user', client);
  if (!users || users.length) return;

  const user = users[0];
  const cars = await postgres.query(response, queries.car.getCar, [user.car_id], 'failed to get car', client);
  const colors = await postgres.query(response, queries.color.getColor, [user.color_id], 'failed to get color', client);

  if (!colors) colors = [];
  if (!cars) cars = [];
  
  const newUser = serializers.user.serialize(users, cars, colors)[0];
  response.json(newUser);
  
  await client.end();
}

exports.createUser = async function(req, response) {
  const firstname = req.body['firstname'];
  const lastname = req.body['lastname'];
  const birthdate = req.body['birthdate'];
  const has_driver_licence = req.body['has_driver_licence'];
  const car_id = req.body['car_id'];
  const color_id = req.body['color_id'];

  postgres.query(response, queries.user.createUser, [
    firstname, 
    lastname,
    birthdate,
    has_driver_licence,
    car_id,
    color_id
  ], 'failed to create user');
}

exports.updateUser = async function(req, response) {
  const user_id = req.body['user_id'];
  const firstname = req.body['firstname'];
  const lastname = req.body['lastname'];
  const birthdate = req.body['birthdate'];
  const has_driver_licence = req.body['has_driver_licence'];
  const car_id = req.body['car_id'];
  const color_id = req.body['color_id'];

  postgres.query(response, queries.user.updateUser, [
    firstname, 
    lastname,
    birthdate,
    has_driver_licence,
    car_id,
    color_id,
    user_id,
  ], 'failed to update user'); 
}

exports.deleteUser = async function(req, response) {
  const user_id = req.params['id'];
  postgres.query(response, queries.user.deleteUser, [user_id], 'failed to delete user');
}