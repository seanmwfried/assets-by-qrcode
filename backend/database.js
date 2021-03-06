const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const crypto = require('crypto');

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
async function createAsset(database, data) {
  try {
    const collection = database.collection('assets');

    const assetName = data[0].assetName;
    const assetPassword = crypto.createHash('sha256').update(data[0].assetPassword).digest('base64');
    data.shift();

    const fields = JSON.stringify(data);
    const toDBData = {
      name: assetName,
      password: assetPassword,
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

async function modifyAsset(database, data) {
  try {
    const collection = database.collection('assets');

    const assetName = data[0].assetName;
    const passwordAttempt = crypto.createHash('sha256').update(data[0].passwordAttempt).digest('base64');
    const _id = new mongodb.ObjectId(data[0]._id);
    data.shift();

    const asset = await collection.findOne({ _id });

    if(passwordAttempt !== asset.password){
      return JSON.stringify({ result: false, error: 'Incorrect password.'});
    } else {

      const fields = JSON.stringify(data);

      const update = await collection.updateOne({ _id }, {
        $set: {
          name: assetName,
          fields: fields || null
        }
      });
      
      return JSON.stringify({ 
        result: true
      });
    }

  } catch(error) {
    console.log(error);
    return JSON.stringify({ result: false, error });
  }
}

async function deleteAsset(database, data) {
  try {
    const collection = database.collection('assets');

    const passwordAttempt = crypto.createHash('sha256').update(data.passwordAttempt).digest('base64');
    const _id = new mongodb.ObjectId(data._id);

    const asset = await collection.findOne({ _id });

    if(passwordAttempt !== asset.password){
      return JSON.stringify({ result: false, error: 'Incorrect password.'});
    } else {
      await collection.deleteOne({ _id });
      
      return JSON.stringify({ 
        result: true
      });
    }

  } catch(error) {
    console.log(error);
    return JSON.stringify({ result: false, error });
  }
}

async function getAsset(database, assetID) {
  try {
    const collection = database.collection('assets');

    const asset = await collection.findOne({_id: new mongodb.ObjectId(assetID)});
    //Don't stringify this time as QR data needs to be added later
    return { result: true, asset };

  } catch(error) {
    console.log(error);
    return JSON.stringify({ result: false, error });
  }
}

module.exports = {
  startDB,
  createAsset,
  modifyAsset,
  deleteAsset,
  getAsset
}