var AddressController  = require('./Controllers/AddressController');

module.exports = [
  { method: 'GET', path: '/',  config: { auth: false } , handler: AddressController.getAddress },
  { method: 'POST', path: '/getAddress',  config: { auth: false } , handler: AddressController.getAddress }
];
