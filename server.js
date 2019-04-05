const express = require('express'); // Libreria nodejs
const logger = require('morgan'); // Logger
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mercadopago = require('mercadopago');
const fs = require('fs');

// Initialize mercadopago SDK
mercadopago.configure({
  access_token: config.access_token
  // client_id: config.client_id,
  // client_secret: config.client_secret
});


mercadopago.configurations.setAccessToken(config.access_token);

payment_methods = mercadopago.get("/v1/payment_methods");

console.log(payment_methods);

app.post(/\/(.+)/, function (req, res) { // Busco el js que quiero correr.
  var fileFromParameter = req.params[0] + '.js';

  if (fs.existsSync(fileFromParameter)) {
    // Execute the file found
    require('./' + fileFromParameter).run(req, res);
  } else {
    // Return 404
    res.status(404).render('404', {
      file: fileFromParameter
    });
  }
});

app.get('/', function(req, res){
	res.json({"backend" : "Listening..."});
});

// Add Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Set Jade as View Engine
app.set('view engine', 'jade');


app.listen(3000, function(){
 console.log('Node server listening on port 3000');
});
