const express = require('express'); // Libreria nodejs
const logger = require('morgan'); // Logger
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mercadopago = require('mercadopago');
const fs = require('fs');

mercadopago.configure({
  sandbox: true,
  access_token: config.access_token
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post(/\/(.+)/, function (req, res) {
  
  var fileFromParameter = req.params[0] + '.js';
  if (fs.existsSync(fileFromParameter)) {
    require('./' + fileFromParameter).run(req, res);
  } else {
    // Return 404
    res.status(404).render('404', {
      file: fileFromParameter
    });
  }
});



/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

// route to '/' to return the html file
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
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
