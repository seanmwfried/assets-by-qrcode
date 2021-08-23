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
    * Expected fields:
    * urlHandle (this is the _id)
    * name
    * password
    * fields (stringified JSON of input fields)
*/
async function attemptCreateAsset(database, data) {
    try {
        const collection = database.collection('assets');

        const existsCheckResult = await collection.findOne({_id: data.urlHandle});

        if(existsCheckResult){
            return JSON.stringify({ result: false, error: 'Asset URL already taken.'})
        } else {
            const addAssetResult = await collection.insertOne({
                _id: data.urlHandle,
                name: data.name,
                password: data.password,
                fields: data.fields || null
            });
            
            return JSON.stringify({ result: true });
        }
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