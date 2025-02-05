// const { status } = require("init")
// let csv = require('csvtojson');

let UserModel = require('../models/UserModel')
let multer = require('multer');
let xlsx = require('xlsx');
let fs = require('fs');


// let storage = multer.diskStorage({ 
//     destination : (req ,res , next) => {
//         next(null , './public/uploads')
//     } ,
    
//     filename : (req , res , next) => {
//         next(null , file.originalname)
//     }
//  });

// var upload = multer({ storage : storage })

// module.exports = {
//     get : (req , res) => {
//         res.render('../views/dashboard/excelpost')
//     }
// ,
//     post : (req , res) => {
//         csv()
//         .fromFile(req.file.path)
//         .then(( ress ) => {
//             for( let x = 0; x < ress.length; x++ ){
//                 user.push({
//                     name : ress[x].name,
//                     job : ress[x].job,
//                     company : ress[x].company
//                 })

//             }
//             users.insertMany(user)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }
// }

// let storage = multer.memoryStorage();

let storage = multer.diskStorage({ 
    destination : (req , res , next) => {
        next(null , 'public/uploads/')
    } ,
    
    filename : (req , file , next) => {
        next(null , file.originalname)
    }
 });

let upload = multer({ storage : storage });

module.exports = {
    upload ,
    get : (req , res) => {
        res.render('../views/dashboard/excelpost')
    },

        post: (req, res) => {

            if(!req.file){
                return res.render('../views/dashboard/')
            }
            else{
                let workbook = xlsx.readFile(req.file.path);
            let sheetName = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[sheetName];
            let jsonData = xlsx.utils.sheet_to_json(worksheet);

            let jsonDataString = JSON.stringify(jsonData, null, 2);

            // Map jsonData to match the schema
        let mappedData = jsonData.map((data) => ({
            name: data.name ,
            job: data.job,
            company: data.company,
            file: req.file.filename,
        }));

        // Insert all documents at once
        UserModel.insertMany(mappedData)
        .then(() => {
            console.log('Data saved to MongoDB successfully!');
            res.redirect('/dashboard/upload');
            console.log(mappedData)
        })
        .catch((err) => {
            console.error('Error saving data to MongoDB:', err);
            res.redirect('/dashboard/');
        });
            }

}
}