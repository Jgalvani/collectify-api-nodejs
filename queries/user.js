exports.getUsers = 'SELECT * FROM users';

exports.getUser = 'SELECT * FROM users WHERE user_id = $1';

exports.createUser = `INSERT INTO users 
    (firstname, lastname, birthdate, has_driver_licence, car_id, color_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

exports.updateUser = `UPDATE users 
    SET firstname = $1, 
        lastname = $2, 
        birthdate = $3,
        has_driver_licence = $4,
        car_id = $5,
        color_id = $6
    WHERE user_id = $7 RETURNING *`;

exports.deleteUser = 'DELETE FROM users WHERE user_id = $1 RETURNING *';