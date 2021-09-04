const { MongoClient } = require('mongodb');

//Connection URI
const uri = "mongodb://localhost:27017/qrAssets";

//Create a new MongoClient
const client = new MongoClient(uri);

async function startDB(){
  await client.connect();
  return client.db('qrAssets');
}

console.log("Connected successfully to server");

/*
  * Expected data is array where the zero index is metadata & the remaining
  * data are user created fields
*/
async function attemptCreateAsset(database, data) {
  try {
    const collection = database.collection('assets');

    const assetName = data.data[0].assetName;
    data.data.pop();

    const fields = JSON.stringify(data.data);
    const toDBData = {
      name: data.data[0].assetName,
      fields: fields || null
    }

    const addAssetResult = await collection.insertOne(toDBData);
    
    return JSON.stringify({ 
      result: true,
      assetID: addAssetResult.insertedId.toString()
    });
  } catch(error) {
    console.log(error);
    return JSON.stringify({ result: false, error });
  }
}

async function getAsset(database, urlHandle) {
  try {
    const collection = database.collection('assets');

    const asset = await collection.findOne({_id: urlHandle})
    return { result: true, asset };

  } catch(error) {
    console.log(error);
    return JSON.stringify({ result: false, error });
  }
}

module.exports = {
  startDB,
  attemptCreateAsset,
  getAsset
}