// let mongoose = require('mongoose')
let fs = require('fs')
let AppController = require('./AppController')
let ProductModel = require('../models/ProductModel')

module.exports = {


    //================== Frontend ==================//

    frontend: {
        get: (req, res) => {
            ProductModel.find({})
                .then((Products) => {
                    res.render('../views/pages/index', { Products })
                    // console.log(Data)
                })
        },

        // singleProduct: (req, res , next) => {
        //     ProductModel.findOne({ url: req.params.id })
        //         .then((singleProduct) => {
        //             if (!singleProduct) {
        //                 return res.redirect('/404.html');
        //             }
        //             res.render('../views/products/product', { singleProduct });
        //         })
        //         .catch(next); // Pass errors to the error handling middleware
        //     }
        singleProduct: (req, res, next) => {
            const productId = req.params.id; // Extract the product ID from the URL
            ProductModel.findOne({ url: productId })
                .then((singleProduct) => {
                    if (!singleProduct) {
                        return res.redirect('/404.html'); // Redirect if product not found
                    }
                    res.render('../views/products/product', { singleProduct });
                    console.log(singleProduct);
                    console.log(productId);
                })
                .catch(next); // Handle errors
        },
    },
    //================== Backend ==================//

    get: (req, res) => {
        ProductModel.find({})
            .then((Data) => {
                res.render('../views/dashboard/products/product-index', { Data })
                // console.log(Data)
            })
            .catch((Data_err) => {
                console.log(Data_err)
            })
    },

    add: {
        get: (req, res) => {
            res.render('../views/dashboard/products/product-add')
        },
        post: (req, res) => {

            const dupliUrl = AppController.slug(req.body.Heading);
            let image = req.files['Photo'] ? req.files['Photo'][0] : `/images/no-image.jpg`;
            let pdf = req.files['Pdf'] ? req.files['Pdf'][0] : `/images/no-image.jpg`;

            ProductModel.findOne({ url: dupliUrl })
                .then((sameUrl) => {
                    if (sameUrl) {
                        res.redirect('/dashboard/products')
                        console.log("Url Products Name is Same")
                    }
                    else {
                        ProductModel.create({
                            Heading: req.body.Heading,
                            url: AppController.slug(req.body.Heading),
                            Photo: image.filename,
                            Pdf: pdf.filename,
                            iframe: req.body.iframe,
                            Short_Description: req.body.Short_Description,
                            Description: req.body.Description,
                            Extra_Description: req.body.Extra_Description,
                            Title: req.body.Title,
                            Meta_Description: req.body.Meta_Description,
                            Meta_Keyword: req.body.Meta_Keyword,
                        })
                            .then(() => {
                                res.redirect('/dashboard/products')
                            })
                            .catch((errsubimt) => {
                                res.redirect('/dashboard/products')
                                // console.log("Data Not Submit")
                                console.log(errsubimt)
                            })
                    }

                })
        }

    },

    edit: {
        get: (req, res) => {
            ProductModel.findOne({ url: req.params.id })
                .then((Edit_products) => {
                    res.render('../views/dashboard/products/product-edit', { Edit_products })
                    // console.log(Data)
                })
                .catch((Edit_products_err) => {
                    console.log(Edit_products_err)
                })
        },

        put: (req, res) => {
            let image = req.files['Photo'] ? req.files['Photo'][0] : `/images/no-image.jpg`;
            let pdf = req.files['Pdf'] ? req.files['Pdf'][0] : `/images/no-image.jpg`;

            ProductModel.updateOne({ url: req.params.id },
                {
                    $set:
                    {
                        Heading: req.body.Heading,
                        url: AppController.slug(req.body.Heading),
                        Photo: image.filename,
                        Pdf: pdf.filename,
                        iframe: req.body.iframe,
                        Short_Description: req.body.Short_Description,
                        Description: req.body.Description,
                        Extra_Description: req.body.Extra_Description,
                        Title: req.body.Title,
                        Meta_Description: req.body.Meta_Description,
                        Meta_Keyword: req.body.Meta_Keyword,
                    }
                })
                .then((Data_updated) => {
                    res.redirect('/dashboard/products/')
                })
                .catch((y) => {
                    console.log(y)
                })
        } ,

        putStatus: (req, res) => {
            const productId = req.params.id;
            const newStatus = req.body.status;
    
            ProductModel.findByIdAndUpdate(productId, { Status : newStatus }, { new: true })
                .then((updatedPage) => {
                    res.redirect('/dashboard/products');
                })
                .catch((err) => {
                    console.error('Error updating page status:', err);
                    res.status(500).send('Error updating page status');
                });
            }
    },

    delete: (req, res) => {
        ProductModel.findOne({ _id: req.params.id })
            .then((Product) => {
                AppController.destination(req, { fieldname: 'Photo' }, (err, imgpathfolder) => {
                    AppController.destination(req, { fieldname: 'Pdf' }, (err, pdfpathfolder) => {
                        let imgpath = `${imgpathfolder}/${Product.Photo}`
                        let pdfpath = `${pdfpathfolder}/${Product.Pdf}`

                        fs.unlink(imgpath, (err) => {
                            console.log('Image Deleted')
                        })
                        fs.unlink(pdfpath, (err) => {
                            console.log('pdf Deleted')
                        })

                        ProductModel.deleteOne({ _id: req.params.id })
                            .then((del_Data) => {
                                // console.log(del_Data)
                                res.redirect('/dashboard/products/')
                            })
                    })
                })
            })

    }
}

    