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
                fields: data.fields
            })
        }
    }
}

//Will add new user to database
//Returns true if successful, false if failed
async function createUser(database, userName, password) {
    try {
        const collection = database.collection('users');


        const checkResult = await collection.findOne({userName});

        if(checkResult){
            console.log('exists');
            return false;
        } else {
            console.log('doesn\'t exist');
            const addResult = await collection.insertOne({
                userName: userName,
                password: password
            });
            return true;
        }
        
    } catch(error) {
        console.dir(error);
        return false;
    }
}

async function checkPassword(database, userName, password) {
    try {
        const collection = database.collection('users');

        const result = await collection.findOne({userName});
        console.log('Password checker: ', result.password, password)
        return result.password === password;
    } catch(error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    startDB,
    createUser,
    checkPassword,
    attemptCreateAsset
}