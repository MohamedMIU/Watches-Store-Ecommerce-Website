const Product = require('../models/products') 

const home_readProducts = (req, res) => {
    Product.find()
    .then((result) => {
        res.render('index', {Products: result});
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    home_readProducts
}