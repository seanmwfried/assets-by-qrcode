const qrcode = require('qrcode');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('../frontend/'));
app.use(express.urlencoded());

app.post('/qr', (req, res) => {
	console.log(req.body);
	qrcode.toDataURL(req.body.userData, function(err, url){
		console.log(url);
		res.end(url);
	})	
});

app.listen(port, () => {
	console.log(`Listening on localhost:${port}`);
})
