let multer = require('multer');
let slugify = require('slugify');

//Page Slug . . .
let Data  = (slug) => {
    let slugUrl = slugify( slug , {
        replacement : '-' , 
        lower: true , 
        trim : true ,
        remove: /[*+~.()$'"!:@]/g, 
        strict: false, 
        locale: 'vi'
    });
    // return slugUrl + '.html';
    return slugUrl;
};

// location slug
let loc_slug = (slugLoc) => {
    let Loca_slug = slugify( slugLoc , {
        replacement : '-' , 
        lower: true , 
        trim : true ,
        remove: /[*+~.()$'"!:@]/g, 
        strict: false, 
        locale: 'vi'
    })

    // return '/' + Loca_slug
    return Loca_slug
}


// Function to dynamically generate destination folder based on controller name
let destination = function(req, file, cb) {
    let ControllerName = req.originalUrl.split('/')[2]; // Assuming the controller name is the third segment in the URL path
    if(file.fieldname === 'Photo'){
        let destinationPath = `public/images/${ControllerName}`;
        cb(null, destinationPath);
    } 
    if(file.fieldname === 'Pdf') {
        let destinationPath = `public/images/${ControllerName}/pdf`;
        cb(null, destinationPath);
    }
}

// Configure multer storage with dynamically generated destination
let storage = multer.diskStorage({
    destination : destination ,

    filename : (req, file, cb) => {
        let slug = slugify(req.body.Heading, {
                replacement : '-' , 
                lower: true , 
                trim : true ,
                remove: /[*+~.()$'"!:@]/g, 
                strict: false, 
                locale: 'vi'
            })
        let ext = file.originalname.split('.').pop(); // Get the file extension
        let fileName = `${slug}.${ext}`; // Combine slug and file extension
        cb(null, fileName);
    }

})

// Initialize multer with configured storage
let upload = multer({ 
    storage : storage ,
    fileFilter : ((req , file , cb) => {
        if(file.fieldname === 'Photo' && (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif')){
            cb(null , true)
        } else if(file.fieldname === 'Pdf' && (file.mimetype == 'application/pdf')) {
            cb(null, true)
        } else {
            cb(null , false)
            return(cb( new Error('Only Jpeg, Jpg, Png, and PDF allowed sir')))
    }
    })
})


// console.log(destinationPath);
module.exports = { slug : Data , upload , destination ,  slugLoc : loc_slug }
