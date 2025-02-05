let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    filename : String ,
    file : String ,
    name : String ,
    job : String ,
    company : String ,
})

let userModel = mongoose.model( 'users' , userSchema )

module.exports = userModel;