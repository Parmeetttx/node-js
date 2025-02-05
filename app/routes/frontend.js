let express = require('express');
let AppController = require('../controllers/AppController');
let PageController = require('../controllers/PageController');
let ProductController = require('../controllers/ProductController');
let LocationController = require('../controllers/LocationController');
let LeadModel = require('../controllers/LeadController');
let Router = express();

// ================== Pages ================== //
Router.get('/', PageController.frontend.get);
Router.get('/company-profile.html', PageController.frontend.companyprofile);
Router.get('/our-products.html', PageController.frontend.ourproducts);
Router.get('/contact-us.html', PageController.frontend.contactus);
Router.get('/sitemap.html', PageController.frontend.sitemap);
Router.get('/our-presence.html', LocationController.frontend.get);

// Router.get('/:url/url.html', SubdomainController.frontend.category);
// Router.get('/services/:Url.html', SubdomainController.frontend.getsingle);
// Route for location and product: /location/product.html
// Router.get('/:Url/:id.html', LocationController.frontend.getproduct);
// Route for product inside a location (e.g., /india/product.html)

Router.post('/email_submit', LeadModel.emailsend.post);

// ================== 404 Page ================== //
Router.get('/404.html', (req, res) => {
    res.render('../views/pages/404');
});

// Router.get('/services-category.html', SubdomainController.frontend.category);
// Router.get('/manufacturers-category.html', SubdomainController.frontend.category);
// Router.get('/services/:id.html', SubdomainController.frontend.categoryproduct);
// Router.get('/manufacturers/:id.html', SubdomainController.frontend.categoryproduct);
// Router.get('/sitemap.xml', SitemapController.frontend.index);



// Route for single product: /product.html
Router.get('/:id.html', ProductController.frontend.singleProduct);
// Router.get('/:Url/:id.html', LocationController.frontend.getproduct);

// Route for single location (e.g., /location)
Router.get('/:id', LocationController.frontend.getsingle);

// ================== Products ================== //

// Fallback for unmatched routes
Router.use((req, res) => {
    res.redirect('/404.html');
});

module.exports = Router;
