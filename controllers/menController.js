const Product = require('../models/products') 

const men_get = (req, res) => {
    Product.find()
        .then((result) => {
            res.render('Men', { Products: result, query: req.query.query || '' });
        })
        .catch((err) => {
            console.log(err);
        });
};

const men_search =  (req, res) => {
    const query = req.query.query;
        Product.find({ name: { $regex: new RegExp(query, 'i') } })
        .then((result) => {
            res.render('Men', { Products: result, query: query });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error searching products');
        });
};

const men_sortBy = (req, res) => {
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
            res.render('Men', { Products: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching products');
        });
};

module.exports = {
    men_get,
    men_search,
    men_sortBy
}