exports.getCars = 'SELECT * FROM cars';

exports.getCar = 'SELECT * FROM cars WHERE car_id = $1';

exports.createCar = 'INSERT INTO cars (name) VALUES ($1) RETURNING *';

exports.updateCar = 'UPDATE cars SET name = $1 WHERE car_id = $2 RETURNING *';

exports.deleteCar = 'DELETE FROM cars WHERE car_id = $1 RETURNING *';