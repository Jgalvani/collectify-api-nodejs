exports.get = 'SELECT * FROM car_has_color WHERE car_id = $1';

exports.getAll = 'SELECT * FROM car_has_color';

exports.createOne = 'INSERT INTO car_has_color (car_id, color_id) VALUES ($1, $2) RETURNING *';

exports.createMultiple = 'INSERT INTO car_has_color (car_id, color_id) VALUES %L RETURNING *';

exports.delete = 'DELETE FROM car_has_color WHERE car_id = $1 RETURNING *';