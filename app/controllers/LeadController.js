
let nodemailer = require('nodemailer')
let LeadModel = require('../models/LeadModel')
module.exports = {
    
    emailsend : {
        post : (req , res) => { 

            LeadModel.create({
                Name : req.body.name ,
                Email : req.body.from , 
                Phone : req.body.phone ,
                Product : req.body.product ,
                Message : req.body.message 
            })
            .then((save) => {
                let name = req.body.name;
            let to = "parmeet3122@gmail.com";
            let from = req.body.from;
            let phone = req.body.phone;
            let product = req.body.product;
            let message = req.body.message;

            let thankmessage = "Thank You For Mailing Us. We Revert As Soon As Possible."

            let transporter =  nodemailer.createTransport({
                service : 'gmail',
                auth : {
                    user : 'parmeet3122@gmail.com' , 
                    pass : 'wnvu iqfj tmcl fnfu'

                }
            })

            let mailOption = {
                from: from ,
                to: to ,
                subject: 'Message from your website',
                text: `Name: ${name}\n From: ${from}\n Product: ${product}\n Phone: ${phone}\n Message: ${message}`,
            }

            transporter.sendMail(mailOption , function(error , info){
                if(error) {
                    console.log(error)
                } else {
                    console.log('Email Send :' + info.res);

                    
                    let thankOption = {
                        name : "Parmeet Singh" ,
                        to : from ,
                        text : `${name} \n ${thankmessage}`
                    }
                    
                    transporter.sendMail(thankOption);
                }
                res.redirect('/contact-us.html')
            })
            })
            .catch((err) => {
                console.log(err)
            })

        }
    } ,

    get : (req , res) => {
        LeadModel.find({})
        .then((Data) => {
            res.render('../views/dashboard/leads/index' , {Data})
        })
    }
}