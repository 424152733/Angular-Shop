var mongoose = require('mongoose');
var GoodSchema = require('../schemas/shop')
var Good = mongoose.model("Good",GoodSchema);

module.exports = Good