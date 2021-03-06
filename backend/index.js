const express 	    = require('express');
const path		      = require('path');
const db 		        = require('./database');
const qrcode 	      = require('qrcode');
const app 		      = express();
const ip            = '192.168.1.69';
const backendPort   = 3000;
const frontendPort  = 8080;

let database;

initDB();

app.use(express.static('../frontend/'));
app.use(express.urlencoded());
app.use(express.json());

//Allow CORS during development so Vue dev server can connect to backend
//TODO: REMOVEME FOR PRODUCTION
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
});

app.post('/asset/create', (req, res) => {
	createAsset(req.body).then((result) => {
		console.log('/asset/create returning', result);
		res.end(result);
	});
});

app.post('/asset/modify', (req, res) => {
  modifyAsset(req.body).then((result) => {
    console.log('/asset/modify returning', result);
    res.end(result);
  })
});

app.post('/asset/delete', (req, res) => {
  console.log(req.body);
  deleteAsset(req.body).then((result) => {
    console.log('/asset/delete returning', result);
    res.end(result);
  })
});

app.post('/asset', (req, res) => {
  console.log(req.body);
	getAsset(req.body.assetID).then((result) => {
    //Don't send password to front end!
    delete result.asset.password;
    //Create QRCode then send response
		qrcode.toDataURL(`http://${ip}:${frontendPort}/asset/${result.asset._id.toString()}`, (_, url) => {
			result.asset.qrData = url;
			const resultString = JSON.stringify(result);
			console.log('/asset returning', result);
			res.end(resultString);
		});
	})
});

//TODO: Serve Vue app on "/" route

app.listen(backendPort, () => {
	console.log(`Listening on localhost:${backendPort}`);
});

async function createAsset(data) {
	const result = await db.createAsset(database, data);
	return result;
}

async function modifyAsset(data) {
  const result = await db.modifyAsset(database, data);
  return result;
}

async function deleteAsset(data) {
  const result = await db.deleteAsset(database, data);
  return result;
}

async function getAsset(assetURL) {
	const result = await db.getAsset(database, assetURL);
	return result;
}

async function initDB(){
	database = await db.startDB();
}
