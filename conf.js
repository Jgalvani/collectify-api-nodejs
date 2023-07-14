exports.db = function() {
  return {
    connectionString: process.env.CONNECTION_STRING,
  };
}