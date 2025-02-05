const LocationModel = require("../models/LocationModel");
const PageModel = require("../models/PageModel");
const ProductModel = require("../models/ProductModel");
module.exports = {
    frontend: {
        index: (req, res) => {
            // Fetch all necessary data using Promise.all
            Promise.all([
                PageModel.find({}),
                ProductModel.find({}),
                LocationModel.find({}),
            ])
            .then(([Pageurl, Producturl, Locationurl ]) => {
                // Compute totals
                // const total_products = Producturl.length;
                // const total_subdomains = Subdomainurl.length;
                // const total_locations = Locationurl.length;
                // const total_subdomains_pages = total_products * total_subdomains;
                // const total_locations_pages = total_products * total_locations;
                // const sitemap_page_count = Math.ceil(total_locations_pages / 4000) + 2;
                // const indexed_pages = 5 + total_products + total_subdomains + total_locations + total_subdomains_pages + total_locations_pages;
        
                // Pass variables to EJS template
                res.render('../views/sitemap/index', {
                    Pageurl,
                    Producturl,
                    Locationurl,
                    // Subdomainurl,
                    // total_products,
                    // total_subdomains,
                    // total_locations,
                    // total_subdomains_pages,
                    // total_locations_pages,
                    // sitemap_page_count,
                    // indexed_pages
                });
            })
            .catch((error) => {
                console.error("Error generating sitemap:", error);
                res.status(500).send("Internal Server Error");
            });
        }
        ,
        // view : (req , res) => {
            
        // }
    }
};
