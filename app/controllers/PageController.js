// let mongoose = require('mongoose')
let fs = require('fs')
let AppController = require('./AppController')
let PageModel = require('../models/PageModel')

module.exports = {


//================== Frontend ==================//

    frontend :  {
        get : (req ,res) => {
            PageModel.find({})
            .then((Pages) => {
                res.render('../views/pages/index', { Pages })
                // console.log(Data)
            })
            .catch((Page_err) => {
                console.log(Page_err)
            })
        },
        // dynamic : {
        //     get : (req,res) => {
        //         PageModel.findOne({url : req.params.id})
        //         .then((x) => {
        //             res.render('../views/pages/dynamic' , { x })
        //         })
        //     }
        // }
        // ,
        companyprofile :  (req ,res) => {
            PageModel.findOne({ url : 'company-profile' })
            .then((Page) => {
                if (!Page) {
                    return res.redirect('/404.html');
                }
                res.render('../views/pages/about' , { Page })
            })
        },

        contactus : (req , res) => {
            PageModel.findOne({ url : 'contact-us' })
            .then((Page) => {
                if (!Page) {
                    return res.redirect('/404.html');
                }
                res.render('../views/pages/contact' , { Page })
            })
        },

        sitemap : (req , res) => {
            PageModel.findOne({ url : 'sitemap' })
            .then((Page) => {
                if (!Page) {
                    return res.redirect('/404.html');
                }
                res.render('../views/pages/sitemap' , { Page })
            })
        },

        ourproducts : (req , res) => {
            PageModel.findOne({ url : 'our-products' })
            .then((Page) => {
                if (!Page) {
                    return res.redirect('/404.html');
                }
                res.render('../views/products/index' , { Page })
            })
        },
        ourpresence : (req , res) => {
            PageModel.findOne({ url : 'our-presence' })
            .then((Page) => {
                if (!Page) {
                    return res.redirect('/404.html');
                }
                res.render('../views/locations/view' , { Page })
            })
        },

        // servicescategory : (req , res) => {
        //     PageModel.findOne({ url : 'services-category' })
        //     .then((Page) => {
        //         if (!Page) {
        //             return res.redirect('/404.html');
        //         }
        //         res.render('../views/subdomains/index' , { Page })
        //     })
        // }
    } , 

    //================== Backend ==================//

    get: (req, res) => {
        PageModel.find({})
            .then((Data) => {
                res.render('../views/dashboard/pages/page-index', { Data })
                // console.log(Data)
            })
            .catch((Data_err) => {
                console.log(Data_err)
            })
    },

    add: {
        get: (req, res) => {
            res.render('../views/dashboard/pages/page-add')
        },
        post: (req, res) => {

            const dupliUrl = AppController.slug(req.body.Heading); 
            let image = req.files['Photo'] ? req.files['Photo'][0] : `/images/no-image.jpg`;
            let pdf = req.files['Pdf'] ? req.files['Pdf'][0] : `/images/no-image.jpg`;

            PageModel.findOne({ url:  dupliUrl })
                .then((sameUrl) => {
                    if (sameUrl) {
                        res.redirect('/dashboard/pages')
                        console.log("Url Pages Name is Same")
                    }
                    else {
                        PageModel.create({
                            Heading: req.body.Heading,
                            url: AppController.slug(req.body.Heading),
                            Photo: image.filename,
                            Pdf: pdf.filename,
                            Short_Description: req.body.Short_Description,
                            Description: req.body.Description,
                            Extra_Description: req.body.Extra_Description,
                            Title: req.body.Title,
                            Meta_Description: req.body.Meta_Description,
                            Meta_Keyword: req.body.Meta_Keyword,
                        })
                            .then(() => {
                                res.redirect('/dashboard/pages')
                            })
                            .catch((errsubimt) => {
                                res.redirect('/dashboard/pages')
                                // console.log("Data Not Submit")
                                console.log(errsubimt)
                            })
                    }

                })
        }

    },

    edit: {
        get: (req, res) => {
            PageModel.findOne({ url: req.params.id })
                .then((EditData) => {
                    res.render('../views/dashboard/pages/page-edit', { EditData })
                    // console.log(Data)
                })
                .catch((EditData_err) => {
                    console.log(EditData_err)
                })
        },

        put: (req, res) => {
            let image = req.files['Photo'] ? req.files['Photo'][0] : `/images/no-image.jpg`;
            let pdf = req.files['Pdf'] ? req.files['Pdf'][0] : `/images/no-image.jpg`;

            PageModel.updateOne({ url: req.params.id },
                {
                    $set:
                    {
                        Heading: req.body.Heading,
                        url: AppController.slug(req.body.Heading),
                        Photo: image.filename,
                        Pdf: pdf.filename,
                        Short_Description: req.body.Short_Description,
                        Description: req.body.Description,
                        Extra_Description: req.body.Extra_Description,
                        Title: req.body.Title,
                        Meta_Description: req.body.Meta_Description,
                        Meta_Keyword: req.body.Meta_Keyword,
                    }
                })
                .then((Data_updated) => {
                    res.redirect('/dashboard/pages/')
                })
                .catch((y) => {
                    console.log(y)
                })
        }
    },

    delete: (req, res) => {
        PageModel.findOne({ _id: req.params.id })
            .then((page) => {
                AppController.destination(req, { fieldname: 'Photo' }, (err, imgpathfolder) => {
                    AppController.destination(req, { fieldname: 'Pdf' }, (err, pdfpathfolder) => {
                        let imgpath = `${imgpathfolder}/${page.Photo}`
                        let pdfpath = `${pdfpathfolder}/${page.Pdf}`

                        fs.unlink(imgpath, (err) => {
                            console.log('Image Deleted')
                        })
                        fs.unlink(pdfpath, (err) => {
                            console.log('pdf Deleted')
                        })

                        PageModel.deleteOne({ _id: req.params.id })
                            .then((del_Data) => {
                                // console.log(del_Data)
                                res.redirect('/dashboard/pages/')
                            })
                    })
                })
            })

    }
}