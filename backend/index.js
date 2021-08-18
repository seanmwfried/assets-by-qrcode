const qrcode = require('qrcode');
const express = require('express');
const db = require('./database');
const app = express();
const port = 3000;

let database;

initDB();

app.use(express.static('../frontend/'));
app.use(express.urlencoded());

app.post('/qr', (req, res) => {
	qrcode.toDataURL(req.body.userData, function(err, url){
		console.log(url);
		res.end(url);
	})	
});

app.post('/asset/create', (req, res) => {
	attemptCreateAsset(req.body).then((result) => {
		console.log('/asset/create returning', result);
		res.end(`{result: ${result}}`)
	});
});

app.post('/login', (req, res) => {
	attemptLogin(req.body.userName, req.body.password).then(function(result){
		console.log('/login returning ', result)
		res.end(`{ result: ${result}}`);
	});
})

app.listen(port, () => {
	console.log(`Listening on localhost:${port}`);
});

async function attemptLogin(userName, password) {
	const result = await db.checkPassword(database, userName, password);
	return result;
}

async function attemptCreateAsset(data) {
	const result = await db.attemptCreateAsset(database, data);
	return result;
}

async function initDB(){
	database = await db.startDB();
}
