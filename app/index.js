let express = require('express');
let app = express();
let fs = require('fs');
// let urlrewrite = require('express-urlrewrite');
let bodyParser = require('body-parser'); 
let methodOverride = require('method-override');

let session = require('express-session')
let configsession = require('./config/config')
app.use(session({secret : configsession.sessionSecret}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(methodOverride('_method'))
// app.use(bodyParser.json())

// DotEnv File1!!
let dotenv = require('dotenv')
    // dotenv.config({path : './.env'})
    dotenv.config({path : './config/.env'})

// Mongoose File
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL , {
    // uncomment this code if connect is not walid
    ssl: true,
    tlsAllowInvalidCertificates: true
}).then(() => {
    console.log(env.PORT)
}).catch((error) => {
    return error
})


   
app.set('view engine' , 'ejs'); //view engine ejs template
app.use(express.static(__dirname+ '/public/')) // direct to public



const PageModel = require('./models/PageModel');


app.use((req , res , next) =>{

    ProductModel.find({Status: 1})
    .then((Product) => {
        res.locals.Products = Product;
        next()
    })

});


app.use((req , res , next) =>{

    LocationModel.find({Status: 1})
    .then((Location) => {
        res.locals.Locations = Location;
        // console.log(Location.Url)
        next()
    })

});


app.use((req, res, next) => {
    res.locals.subdomain = null; // Default to null
    next();
});


// Main Route
app.get('/' , (req , res) => {
    res.render('../views/pages/index')
})

// app.get('/dashboard' , (req , res) => {
//     res.send('Hlo Welcome to Backend')
// })


//------------- Backend Routes---------------//

let admin = require('./routes/admin'); 
// let page = require('./routes/')
app.use('/dashboard/',admin)

let frontend = require('./routes/frontend'); 
const ProductModel = require('./models/ProductModel');
const LocationModel = require('./models/LocationModel');
const { env } = require('process');
const { error } = require('console');
// const { config } = require('process');
// let page = require('./routes/')
app.use('/',frontend);


app.get('/*' , (req , res) => {
    res.redirect('/404.html')
})

// Port Path
Port = process.env.PORT;
app.listen( Port , (req  ,res) => {
    console.log(`${Port} Working correctly`);
})