let mongoose = require('mongoose');
let AdminSchema = mongoose.Schema({
    name : String ,
    password : String
})

let AdminModel = mongoose.model('admintable' , AdminSchema)

module.exports = AdminModel;