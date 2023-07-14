const Client = require('pg').Client;
const conf = require('./conf');

async function getClient() {
  try {
    const client = new Client(conf.db());
    await client.connect();
    return client;

  } catch (err) {
    console.error(err);
    return;
  }
}

exports.getClient = getClient;

exports.query = async function(response, sqlQuery, params, errorMessage, client=null) {
  const hasClient = !!client;
  
  if (!hasClient) {
    client = await getClient();
    
    if (!client) {
      response.json({error: 'the connection to the database failed'});
      return;
    }
  }
  
  try {
      const result = await client.query(sqlQuery, params);
      if (!hasClient) {
        if (result.rows.length > 1) response.json(result.rows);
        else response.json(result.rows[0]);
      }
      else return result.rows;
  
  } catch (err) {
      console.error(err);
      response.json({error: errorMessage});

  } finally {
    if (!hasClient) await client.end()
  }
}
