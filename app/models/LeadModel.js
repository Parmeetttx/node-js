let mongoose = require('mongoose');
let LeadSchema = mongoose.Schema({
    Name : String ,
    Email : String , 
    Phone : String ,
    Product : String ,
    Message : String ,
    Date: { type: Date, default: Date.now }
})

let LeadModel = mongoose.model('Lead' , LeadSchema) 

module.exports = LeadModel