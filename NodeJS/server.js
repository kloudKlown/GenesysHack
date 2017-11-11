var express = require('express');
var https = require('https')
var pem = require('pem')

pem.config({
  pathOpenSSL: 'E:/OpenSSL-Win64/bin/openssl.exe'
})

var app = express();
 
pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }
    
    var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// configure a public directory to host static content
	app.use(express.static(__dirname + '/public'));

  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(3000)
})




// require ("./test/app.js")(app);

// var port = process.env.PORT || 3000;

// app.listen(port);