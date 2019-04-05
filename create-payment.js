var mercadopago = require('mercadopago');
const config = require('./config');
mercadopago.configurations.setAccessToken(config.access_token);
var oldAccessToken = mercadopago.configurations.getAccessToken();

exports.run = function (req, res) {

const token = req.body.token;
const payment_method_id = req.body.payment_method_id;
const installments = req.body.installments;
const issuer_id = req.body.issuer_id;


  var payment = {
  transaction_amount: 100,
  token: token,
  description: 'Blues Junior',
  installments: 1,
  payment_method_id: payment_method_id,
  issuer_id: issuer_id,
  payer: {
    email: 'thomas@hotmail.com'
  }
};

  // Set the access_token credentials for testing
  mercadopago.configurations.setAccessToken(config.access_token);

mercadopago.payment.save(payment).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  }).finally(function() {
    mercadopago.configurations.setAccessToken(oldAccessToken);
  });
};