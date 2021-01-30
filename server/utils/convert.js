const { Cashify } = require('cashify');
const rates = {
	EUR: 1.00,
	USD: 1.12
};
const cashify = new Cashify({base: 'EUR', rates});

module.exports = {
    cashify
}