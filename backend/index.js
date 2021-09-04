const express 	= require('express');
const path		= require('path');
const db 		= require('./database');
const qrcode 	= require('qrcode');
const app 		= express();
const port 		= 3000;

let database;

initDB();

//qrcode.toDataURL()

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
	attemptCreateAsset(req.body).then((result) => {
		console.log('/asset/create returning', result);
		res.end(`{result: ${result}}`)
	});
});

app.post('/asset', (req, res) => {
	getAsset(req.body.assetURL).then((result) => {
		qrcode.toDataURL(`http://10.0.0.16:${port}/asset/${result.asset._id}`, (err, url) => {
			result.asset.qrData = url;
			delete result.asset.password;
			const resultString = JSON.stringify(result);
			console.log('/asset returning', result);
			res.end(resultString);
		});
	})
})

app.get('/asset/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/asset.html'));
});

app.listen(port, () => {
	console.log(`Listening on localhost:${port}`);
});

async function attemptCreateAsset(data) {
	const result = await db.attemptCreateAsset(database, data);
	return result;
}

async function getAsset(assetURL) {
	const result = await db.getAsset(database, assetURL);
	return result;
}

async function initDB(){
	database = await db.startDB();
}
