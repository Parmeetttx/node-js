let mongoose = require('mongoose');
let ProductSchema = mongoose.Schema({
    Heading : String ,
    url : String ,
    Photo : String ,
    Pdf : String ,
    iframe : String ,
    Short_Description : String ,
    Description : String ,
    Extra_Description : String ,
    Title : String ,
    Meta_Description : String ,
    Meta_Keyword : String ,
    Status : { type : Number  , default : 0} 
})

let ProductModel = mongoose.model( 'Product' , ProductSchema )

module.exports = ProductModel;