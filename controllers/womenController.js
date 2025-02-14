const Product = require('../models/products') 

const women_readProducts = (req,res) => { 
    Product.find()
    .then((result) => {
        res.render('women', { Products: result, query: req.query.query || '' });
    })
    .catch((err) => {
        console.log(err);
    })
};

const women_search = (req, res) => {
    const query = req.query.query;
        Product.find({ name: { $regex: new RegExp(query, 'i') } })
        .then((result) => {
            res.render('women', { Products: result, query: query });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error searching products');
        });
};

const women_sortBy = (req, res) => {
    let sortCriteria = {};

    switch (req.query.orderby) {
        case 'popularity':
            sortCriteria = { rating: -1 };
            break;
        case 'price':
            sortCriteria = { price: 1 }; 
            break;
        case 'price-desc':
            sortCriteria = { price: -1 };
            break;
        default:
            sortCriteria = { rating: -1 };
    }

    Product.find().sort(sortCriteria)
        .then((result) => {
            res.render('women', { Products: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching products');
        });
};

module.exports = {
    women_readProducts,
    women_search,
    women_sortBy
}