var AddressController  = require('./Controllers/AddressController');

module.exports = [
  { method: 'GET', path: '/',  config: { auth: false } , handler: AddressController.index },
  { method: 'POST', path: '/getAddress',  config: { auth: false } , handler: AddressController.getAddress }
];
