let mongoose = require('mongoose');
let PageSchema = mongoose.Schema({
    Heading : String ,
    url : String ,
    Photo : String ,
    Pdf : String ,
    Short_Description : String ,
    Description : String ,
    Extra_Description : String ,
    Title : String ,
    Meta_Description : String ,
    Meta_Keyword : String ,
})

let PageModel = mongoose.model('pageTable' , PageSchema)

module.exports = PageModel;