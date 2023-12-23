var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
         name     :String,
         category :String,
         image    : String,
         price    : String,
         brand    :
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brands' 
         },
         color    :
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'colors' 
         }
});
var ToyModel = mongoose.model('toys', ToySchema)
module.exports = ToyModel;