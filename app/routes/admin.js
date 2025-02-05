let express = require('express');
let AppController = require('../controllers/AppController');
let AdminController = require('../controllers/AdminController');
let PageController = require('../controllers/PageController');
let ProductController = require('../controllers/ProductController');
let LocationController = require('../controllers/LocationController');
let UserController = require('../controllers/UserController');
let LeadController = require('../controllers/LeadController');

let {isLogout , isLogin} = require('../middleware/auth');

let Router = express(); 

// Router.get('/' , PageController.frontend.get)

//================== Pages ==================//
// Router.get('/logout' , auth.logout)

Router.get('/login' , isLogout , AdminController.login.get)
Router.post('/login' , isLogout , AdminController.login.post)

Router.use(isLogin)

Router.get('/' , AdminController.count.get)
Router.get('/pages' ,  PageController.get)
Router.get('/pages/add' ,  PageController.add.get)
Router.post('/pages/add' ,  AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , PageController.add.post)
Router.get('/pages/edit/:id' ,  PageController.edit.get)
Router.put('/pages/edit/:id' ,  AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , PageController.edit.put)
Router.delete('/pages/delete/:id' ,  PageController.delete) 

//================== Products ==================//
Router.get('/products' , ProductController.get)
Router.get('/products/add' , ProductController.add.get)
Router.post('/products/add' , AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , ProductController.add.post)
Router.get('/products/edit/:id' , ProductController.edit.get)
Router.put('/products/edit/:id' , AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , ProductController.edit.put)
Router.put('/products/updateStatus/:id', ProductController.edit.putStatus)
Router.delete('/products/delete/:id' , ProductController.delete)

//================== Locations ==================//
Router.get('/locations' , LocationController.get)
Router.get('/locations/add' , LocationController.add.get)
Router.post('/locations/add' , LocationController.add.post)
Router.put('/locations/updateStatus/:id', LocationController.edit.putStatus)
Router.get('/locations/edit/:id' , LocationController.edit.get)
Router.put('/locations/edit/:id' ,  LocationController.edit.put)
Router.delete('/locations/delete/:id' , LocationController.delete)

//================== Locations ==================//
Router.get('/leads' , LeadController.get)

//================== subdomins ==================//
// Router.get('/subdomains' , SubdomainController.get)
// Router.get('/subdomains/add' , SubdomainController.add.get)
// Router.post('/subdomains/add' , AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , SubdomainController.add.post)
// Router.get('/subdomains/edit/:id' , SubdomainController.edit.get)
// Router.put('/subdomains/edit/:id' , AppController.upload.fields([{ name: 'Photo' }, { name: 'Pdf' }]) , SubdomainController.edit.put)
// Router.put('/subdomains/updateStatus/:id', SubdomainController.edit.putStatus)
// Router.delete('/subdomains/delete/:id' , SubdomainController.delete)

//================== Pages Excel ==================//
Router.get('/upload' , UserController.get)
Router.post('/upload' , UserController.upload.single('file') , UserController.post)

// Router.get('/404.html' , ( req , res) => {
//     res.render('../views/pages/404')
// }) 

module.exports = Router; 