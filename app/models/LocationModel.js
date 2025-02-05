let mongoose = require('mongoose');
let locationSchema = mongoose.Schema({
    Heading : String ,
    Url : String,
    Parent : { type: mongoose.Schema.Types.ObjectId , ref: 'Location' } ,
    Status : { type : Number  , default : 0} 
})
 
let LocationModel = mongoose.model('Location' , locationSchema) 

module.exports = LocationModel;