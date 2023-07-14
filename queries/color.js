exports.getColors = 'SELECT * FROM colors';

exports.getColorsFromColorIds = 'SELECT * FROM colors WHERE color_id IN (%L)';

exports.getColorsFromCarId = 'SELECT color_id, name FROM colors INNER JOIN car_has_color using(color_id) WHERE car_id = $1';

exports.getColor = 'SELECT * FROM colors WHERE color_id = $1';

exports.createColor = 'INSERT INTO colors (name) VALUES ($1) RETURNING *';

exports.updateColor = 'UPDATE colors SET name = $1 WHERE color_id = $2 RETURNING *';

exports.deleteColor = 'DELETE FROM colors WHERE color_id = $1 RETURNING *';