const mercadopago = require('mercadopago');

const config = require('./config');
const oldAccessToken = mercadopago.configurations.getAccessToken();

exports.run = function (req, res) {
  const payment = {
    description: 'Buying a PS4',
    transaction_amount: 10500,
    payment_method_id: 'rapipago',
    payer: {
      email: 'tebeckfordd@gmail.com',
      identification: {
        type: 'DNI',
        number: '34123123'
      }
    }
  };

  // Set the access_token credentials for testing
  mercadopago.configurations.setAccessToken(config.access_token);

  mercadopago.payment.create(payment).then(function (data) {
    res.json({data});
  }).catch(function (error) {
    res.json({error});
  }).finally(function() {
    mercadopago.configurations.setAccessToken(oldAccessToken);
  });
};
