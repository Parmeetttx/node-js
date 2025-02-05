let express = require('express');
// let urlrewrite = require('express-urlrewrite');
let AppController = require('../controllers/AppController');    
let PageController = require('../controllers/PageController');
let ProductController = require('../controllers/ProductController');
let LocationController = require('../controllers/LocationController');
// let AdminController = require('../controllers/AdminController');
let LeadModel = require('../controllers/LeadController');
const SubdomainController = require('../controllers/SubdomainController');
let Router = express(); 

//================== Pages ==================//
// Router.get(['/' , 'index.html'] , PageController.frontend.get)
Router.get('/' , PageController.frontend.get)
// Router.get('/:id' , PageController.frontend.dynamic.get)
Router.get('/company-profile.html' , PageController.frontend.companyprofile)
Router.get('/our-products.html' , PageController.frontend.ourproducts)
Router.get('/contact-us.html' , PageController.frontend.contactus)
Router.get('/sitemap.html' , PageController.frontend.sitemap)
Router.get('/our-presence.html' , LocationController.frontend.get)

Router.post('/email_submit' , LeadModel.emailsend.post)

//================== Products ==================//


Router.get('/404.html' , ( req , res) => {
    res.render('../views/pages/404')
})
// Define the URL rewrites
// Router.use(urlrewrite('/products/:id', '/:id'));
// Router.use(urlrewrite('/location/:Url', '/:Url'));


// Use the rewritten URLs in subsequent routes
Router.get('/:id.html', ProductController.frontend.singleProduct);

// Router.get('/:Url/:id.html' , SubdomainController.frontend.get);

// Route for location pages, e.g., /delhi
Router.get('/:Url/', LocationController.frontend.getsingle);

// Route for product pages, e.g., /delhi/product-1.html or /product-1.html
Router.get('/:Url?/:id.html', SubdomainController.frontend.get);

// Router.get('/:Url/:id.html', LocationController.frontend.getsingle);

module.exports = Router;