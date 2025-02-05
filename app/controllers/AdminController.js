
let AdminModel = require('../models/AdminModel')
let LocationModel = require('../models/LocationModel')
let PageModel = require('../models/PageModel')
let ProductModel = require('../models/ProductModel')
// let multer = require('multer')

// let storage = multer.diskStorage({ 
//     destination : (req , res , next) => {
//         next(null , 'public/query/')
//     } ,
    
//     filename : (req , file , next) => {
//         next(null , file.originalname)
//     }
//  });

//  let upload = multer({ storage : storage });

module.exports = {
    // upload ,
    get : ( req , res) => {
        res.render('../views/dashboard/index')
    } ,

    count : {
        get : (req , res) => {
                let count_page = PageModel.find({}).count();
                let count_product = ProductModel.find({}).count();
                let count_location = LocationModel.find({}).count();

                Promise.all([count_page , count_product , count_location])
                .then(([ count_page , count_product , count_location ]) => {
                    res.render('../views/dashboard/index' , { count_page , count_product , count_location })
                })
            }
        },

    login : {
        get : (req , res) => {
            AdminModel.find({})
            .then((log_val) => {
                res.render('../views/dashboard/login' , {log_val})  
            })
        },
        
        post: (req, res) => {
            let inputname = req.body.name;
            let inputpass = req.body.password;
        
            AdminModel.findOne({ name : inputname })
                .then((admin) => {
                    if (admin.password === inputpass) {
                        console.log('Successfully logged in');
                        req.session.userId = admin.name;
                        res.redirect('/dashboard/');
                        
                        
                    } else {
                      
                        res.render('../views/dashboard/login', { error: 'Invalid credentials' });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.render('../views/dashboard/login', { error: 'An error occurred' });
                });
        }
    } ,

}