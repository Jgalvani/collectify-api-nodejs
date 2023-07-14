const postgres = require('../postgres');
const queries = require('../queries');

exports.getColors = async function(request, response) {
  postgres.query(response, queries.color.getColors, [], 'failed to get colors');
}

exports.getColor = async function(req, response) {
  const colorId = req.params['id'];
  postgres.query(response, queries.color.getColor, [colorId], 'failed to get color');
}

exports.createColor = async function(req, response) {
  const name = req.body['name'];
  postgres.query(response, queries.color.createColor, [name], 'failed to create color');
}

exports.updateColor = async function(req, response) {
  const color_id = req.body['color_id'];
  const name = req.body['name'];
  postgres.query(response, queries.color.updateColor, [name, color_id], 'failed to update color',); 
}

exports.deleteColor = async function(req, response) {
  const colorId = req.params['id'];
  postgres.query(response, queries.color.deleteColor, [colorId], 'failed to delete color');
}