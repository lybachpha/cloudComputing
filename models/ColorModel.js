var mongoose = require('mongoose');
var ColorSchema = mongoose.Schema(
    {
         name: String    
    });

var ColorModel = mongoose.model('colors', ColorSchema)
module.exports = ColorModel;