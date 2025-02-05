let LocationModel = require('../models/LocationModel');
const ProductModel = require('../models/ProductModel');
let AppController = require('./AppController');

module.exports = {

    //================== Frontend ==================//

    // frontend : {
    //     get: (req, res) => {
    //         LocationModel.find({})
    //             .then(( Locations ) => {
    //                 res.render('../views/locations/view', { Locations })
    //             })
    //             .catch(( Page_err ) => {
    //                 console.log( Page_err )
    //             })
    //     },

    //     getsingle : (req , res , next) => {
    //         const subdomain = req.params.id ;
    //         // console.log(subdomain)
    //         LocationModel.findOne({ Url : subdomain })
    //         .then(( singleLocation ) => {
    //             if (!singleLocation) {
    //                 return res.redirect('/404.html'); // Redirect if product not found
    //             }
    //             let subdomainname = singleLocation.Heading;
                
    //             res.render('../views/locations/index', { singleLocation , subdomainname})
    //             console.log(singleLocation)
    //             console.log(subdomainname) 
    //         })
    //         .catch(next);
    //     },
        
    //     getproduct: (req, res, next) => {
    //         const urlParts = req.params.id.split('/'); // Split the URL by '/'
            
    //         if (urlParts.length === 2) {
    //             const location = urlParts[0]; // First part is the location (e.g., 'india')
    //             const product = urlParts[1];  // Second part is the product (e.g., 'product.html')
                
    //             console.log('Location:', location);
    //             console.log('Product:', product);
                
    //             // Find the location
    //             LocationModel.findOne({ Url: location }, (err, locationData) => {
    //                 if (err || !locationData) {
    //                     console.error('Location not found');
    //                     return res.status(404).send('Location not found');
    //                 }
                    
    //                 // Find the product
    //                 ProductModel.findOne({ Url: product }, (err, productData) => {
    //                     if (err || !productData) {
    //                         console.error('Product not found');
    //                         return res.status(404).send('Product not found');
    //                     }
                        
    //                     // Return combined data or handle further logic
    //                     res.json({
    //                         location: locationData,
    //                         product: productData,
    //                     });
    //                 });
    //             });
    //         } else {
    //             console.error('Invalid URL format');
    //             res.status(400).send('Invalid URL format');
    //         }
    //     }
        
    // } ,

    frontend: {
        get: (req, res) => {
            LocationModel.find({})
                .then((Locations) => {
                    res.render('../views/locations/view', { 
                        Locations, 
                        currentLocation: null // Default to null for the main domain
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    
        getsingle: (req, res, next) => {
            const subdomain = req.params.id || null;
            LocationModel.findOne({ Url: subdomain })
                .then((singleLocation) => {
                    if (!singleLocation) {
                        return res.redirect('/404.html');
                    }

                    // const allsubdomain = await SubdomainModel.find({});
                    // // const subdomaindata = SubdomainModel.findOne({ [].Url : 'our-presence'})
                    // const subdomaindata = allsubdomain.find((item) => item.url === 'our-presence');
    
                    res.render('../views/locations/index', { 
                        singleLocation, 
                         subdomain // Pass the current location
                    });
                })
                .catch(next);
        },

        getproduct: async (req, res) => {
            const subdomain = req.params.id || null;
            const { Url: location, id } = req.params;
            const productSlug = id.replace('.html', '');
        
            try {
                // Fetch location
                const locationData = await LocationModel.findOne({ Url: location });
                if (!locationData) {
                    console.log('Location not found:', location);
                    // return res.status(404).send('Location not found');
                }
        
                 // Fetch all products
                const allProducts = await ProductModel.find({});
                
                const productData = allProducts.find((item) => item.url === productSlug);
                // console.log(productData);
                const allsubdomain = await SubdomainModel.find({});
                // const subdomaindata = SubdomainModel.findOne({ [].Url : 'our-presence'})
                const subdomaindata = allsubdomain.find((item) => item.url === 'our-presence');

                if (subdomaindata) {
                    subdomaindata.Description = subdomaindata.Description.replace(/products/g, productData.Heading);
                }

                if (subdomaindata) {
                    subdomaindata.Description = subdomaindata.Description.replace(/subdomain/g, locationData.Heading);
                }

                console.log(subdomaindata);

                res.render('../views/locations/product', {
                    location : locationData,
                    product : productData ,
                    pageData : subdomaindata ,
                    subdomain
                });
            } catch (error) {
                console.error('Error occurred:', error);
                res.status(500).send('Internal Server Error');
            }
        }
        // getproduct: async (req, res, next) => {
        //     try {
        //         const location = req.params.Url; // 'india'
        //         const productSlug = req.params.id.replace('.html', ''); // 'product'
        
        //         // Detailed logging of incoming parameters
        //         console.log('Incoming URL Parameters:');
        //         console.log('Location:', location);
        //         console.log('Product Slug:', productSlug);
        
        //         // Find location with detailed logging
        //         const locationData = await LocationModel.findOne({ Url: location });
                
        //         if (!locationData) {
        //             console.log('No Location Found - Search Details:');
        //             console.log('Search Criteria:', { Url: location });
        //             console.log('All Locations in Database:');
        //             const allLocations = await LocationModel.find({});
        //             console.log(allLocations);
        //             return res.status(404).send('Location not found');
        //         }
        
        //         // Flexible product search strategies
        //         const productSearchStrategies = [
        //             { Url: productSlug },                                // Exact match
        //             { Url: { $regex: new RegExp(`^${productSlug}$`, 'i') } },   // Case-insensitive exact match
        //             { Url: { $regex: new RegExp(productSlug, 'i') } },   // Contains match
        //         ];
        
        //         let productData = null;
        //         for (let strategy of productSearchStrategies) {
        //             console.log('Trying Product Search Strategy:', strategy);
        //             productData = await ProductModel.findOne(strategy);
                    
        //             if (productData) {
        //                 console.log('Product Found with Strategy:', strategy);
        //                 break;
        //             }
        //         }
        
        //         // If no product found after all strategies
        //         if (!productData) {
        //             console.log('No Product Found - Search Details:');
        //             console.log('All search attempts failed for:', productSlug);
                    
        //             // Log all products in database for comparison
        //             const allProducts = await ProductModel.find({});
        //             console.log('All Products in Database:');
        //             console.log(allProducts);
        
        //             return res.status(404).send('Product not found');
        //         }
        
        //         // Successful render
        //         res.render('../views/locations/product', {
        //             location: locationData,
        //             product: productData,
        //         });
        
        //     } catch (error) {
        //         console.error('Comprehensive Error Breakdown:');
        //         console.error('Error Name:', error.name);
        //         console.error('Error Message:', error.message);
        //         console.error('Full Error Object:', error);
        //         res.status(500).send('Internal Server Error');
        //     }
        // }
        // getproduct: async (req, res) => {
        //     // const subdomain = req.params.id || null;
        //     const { Url: location, id } = req.params;
        //     const productSlug = id.replace('.html', '');
        
        //     try {
        //         // Fetch location
        //         const locationData = await LocationModel.findOne({ Url: location });
        //         if (!locationData) {
        //             console.log('Location not found:', location);
        //             return res.status(404).send('Location not found');
        //         }

        
        //          // Fetch all products
        //         const allProducts = await ProductModel.find({});
        //         // console.log('Total products fetched:', allProducts);

        //         // Find the product by URL in all products
        //         // const productData = allProducts.find(
        //         //     (product) => product.Url === productSlug || 
        //         //                 new RegExp(`^${productSlug}$`, 'i').test(product.Url) || 
        //         //                 new RegExp(productSlug, 'i').test(product.Url)
        //         // );

        //         // const urls = allProducts.map(product => product.url || 'No URL');
        //         // console.log(productSlug);
        //         // console.log('Finded Product' + ' ' + urls);
                
        //         const productData = allProducts.find((item) => item.url === productSlug);
        //         // console.log(productData);
        //         const allsubdomain = await SubdomainModel.find({});
        //         // const subdomaindata = SubdomainModel.findOne({ [].Url : 'our-presence'})
        //         const subdomaindata = allsubdomain.find((item) => item.url === 'our-presence');

        //         if (subdomaindata) {
        //             subdomaindata.Description = subdomaindata.Description.replace(/products/g, productData.Heading);
        //         }

        //         if (subdomaindata) {
        //             subdomaindata.Description = subdomaindata.Description.replace(/subdomain/g, locationData.Heading);
        //         }

        //         console.log(subdomaindata);

        //         // if (!productData) {
        //         //     console.log('Product not found for slug:', productSlug);
        //         //     return res.status(404).send('Product not found');
        //         // }
        //         // Define product search strategies
        //         // const productSearchStrategies = [
        //         //     { Url: productSlug },
        //         //     { Url: { $regex: new RegExp(`^${productSlug}$`, 'i') } },
        //         //     { Url: { $regex: new RegExp(productSlug, 'i') } }
        //         // ];
        
        //         // // Find product using strategies
        //         // const productData = await productSearchStrategies.reduce(async (acc, strategy) => {
        //         //     const foundProduct = await acc;
        //         //     return foundProduct || ProductModel.findOne(strategy);
        //         // }, Promise.resolve(null));
        
        //         // if (!productData) {
        //         //     console.log('Product not found:', productSlug);
        //         //     return res.status(404).send('Product not found');
        //         // }
        
        //         // Render response
        //         res.render('../views/locations/product', {
        //             location : locationData,
        //             product : productData ,
        //             pageData : subdomaindata
        //         });
        //     } catch (error) {
        //         console.error('Error occurred:', error);
        //         res.status(500).send('Internal Server Error');
        //     }
        // }
        

        // getproduct: (req, res, next) => {
        //     const location = req.params.Url; // 'india'
        //     const productSlug = req.params.id.replace('.html', ''); // 'product'
        
        //     console.log(location);
        //     console.log(productSlug);

        //     let L = LocationModel.findOne({ Url : location }).then((locationData) => {
        //         console.log(locationData)
        //         let P = ProductModel.find({})
        //         console.log(P);
        //     })
        //     // let P = ProductModel.findOne({ Url : productSlug }).then((LproductData) => setInterval(() => {console.log(LproductData)} , 2000))
        //     // let PM = ProductModel.findOne({ Url: { $regex: new RegExp(productSlug, 'i') } }).then((Prod) => console.log(Prod));
             
        //     console.log(L);
        //     // console.log(PM);
            
        // }
    }
    
        // getproduct: (req, res, next) => {
        //     const location = req.params.Url; // Captures 'india'
        //     const productSlug = req.params.id.replace('.html', ''); // Captures 'product' (without '.html')
        //     let me = ProductModel.findOne({ Url: productSlug })
        //     LocationModel.findOne({ Url: location })
        //     .then((locationData) => {
        //         if (!locationData) {
        //             // If location not found, send a 404 response
        //             return res.status(404).send('Location not found');
        //         }

        //         // let me = ProductModel.findOne({ Url: productSlug })
        //         console.log(`hi ji ${productSlug}`)
        //         res.render('../views/locations/product', {
        //             location: locationData,
        //             // product: productData,
        //         });
        //         console.log(location)
        //         console.log(me)
                // ProductModel.findOne({ Url: productSlug })
                //     .then((productData) => {
                //         if (!productData) {
                //             // If location not found, send a 404 response
                //             return res.status(404).send('Product not found');
                //         }

                //         res.render('../views/locations/product', {
                //             location: locationData,
                //             product: productData,
                //         });
                //         console.log(product , location)
                //     })
            // })

            // ProductModel.findOne({ Url: productSlug })
            // .then((productData) => {
            //     if (!productData) {
            //         // If location not found, send a 404 response
            //         return res.status(404).send('Product not found');
            //     }

            //     res.render('../view/locations/product', {
            //         // location: locationData,
            //         product: productData,
            //     });
            //     console.log(product)
            // })
            // console.log(location);
            // console.log(productSlug);

            // Find the location in the database
            // LocationModel.findOne({ Url: location })
            //     .then((locationData) => {
            //         if (!locationData) {
            //             // If location not found, send a 404 response
            //             return res.status(404).send('Location not found');
                        
            //         }
            //         // console.log(locationData);

            //         // Find the product in the database
            //         ProductModel.findOne({ Url: productSlug })
            //             .then((productData) => {
            //                 if (!productData) {
            //                     // If product not found, send a 404 response
            //                     return res.status(404).send('Product not found');
            //                 }

            //                 // console.log(productData);
            //                 // Render the product page from the locations folder
            //                 res.render('../view/locations/product', {
            //                     location: locationData,
            //                     product: productData,
            //                 });
            //                 console.log(location , product);

            //             })
            //             .catch((err) => {
            //                 console.error('Error finding product:', err);
            //                 next(err); // Pass error to the next middleware
            //             });
            //     })
            //     .catch((err) => {
            //         console.error('Error finding location:', err);
            //         next(err); // Pass error to the next middleware
            //     });

           
    //     }
    // }
     
    ,

    //================== Backend ==================//

     get: (req, res) => {
        LocationModel.find({}).populate('Parent')
        .then(( Data ) => {
            res.render('../views/dashboard/locations/location-index' , { Data })    
        })
        
    },

    add: {
        get: (req, res) => {
            LocationModel.find({})  
            .then(( ) => {
                res.render('../views/dashboard/locations/location-add' , )
            })
            
        },
        post: (req, res) => { 
            const {Parent} = req.body;
            const parentid = Parent || null; 
            LocationModel.findOne({ Heading : req.body.Heading })
            .then(( sameUrl ) => {
                if (sameUrl) {
                    res.redirect('/dashboard/locations')
                    console.log("Url locations Name is Same")
                }
                else{
                    LocationModel.create({
                        Heading : req.body.Heading ,
                        Url : AppController.slugLoc(req.body.Heading) ,
                        Parent : parentid
                    })
                    .then(() => {
                        res.redirect('/dashboard/locations')
                    })
                    .catch((errsubimt) => {
                        res.redirect('/dashboard/locations')
                        // console.log("Data Not Submit")
                        console.log(errsubimt)
                    })
                }
            })
        }

    },

    edit: {
        get: (req, res) => {
            LocationModel.findOne({ _id : req.params.id }).populate('Parent')
                .then((Edit_locations) => {
                    res.render('../views/dashboard/locations/location-edit', { Edit_locations })
                    // console.log(Edit_locations)
                })
                .catch((Edit_locations_err) => {
                    console.log(Edit_locations_err)
                })
        },

        put: (req, res) => {
    
            LocationModel.updateOne({ _id : req.params.id },
                {
                    $set:
                    {
                        Heading: req.body.Heading,
                        url: AppController.slug(req.body.Heading),
                        Parent : req.body.Parent
                    }
                })
                .then((Data_updated) => {
                    res.redirect('/dashboard/locations/')
                })
                .catch((y) => {
                    console.log(y)
                })
        } ,

        putStatus: (req, res) => {
            const locaId = req.params.id;
            const newStatus = req.body.status;
    
            LocationModel.findByIdAndUpdate(locaId, { Status : newStatus }, { new: true })
                .then((updatedPage) => {
                    res.redirect('/dashboard/locations');
                })
                .catch((err) => {
                    console.error('Error updating page status:', err);
                    res.status(500).send('Error updating page status');
                });
            }
    },

    delete: (req, res) => {
            LocationModel.deleteOne({ _id: req.params.id })
                .then((del_Data) => {
                    // console.log(del_Data)
                    res.redirect('/dashboard/locations/')
        }) 
    }
}