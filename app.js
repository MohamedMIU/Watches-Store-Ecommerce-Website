const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const Product = require('./models/products');
const Cart = require('./models/carts') 
const User = require('./models/users');
const Order = require('./models/orders');
const homeRoutes = require('./routes/homeRoutes');
const menRoutes = require('./routes/menRoutes');
const womenRoutes = require('./routes/womenRoutes'); 
const aboutRoutes = require('./routes/aboutRoutes'); 
const passwordRoutes = require('./routes/passwordRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const cartRoutes = require('./routes/cartRoutes'); 
const formRoutes = require('./routes/formRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 
const _404Routes = require('./routes/404Routes'); 
require('./passport-setup');
const app = express();
const MongoDBStore = require("connect-mongodb-session")(session);
const dbURI = 'mongodb+srv://mohamed2210290:Stayaway.Me.1@goldentriumph.zeiw0qg.mongodb.net/WebProject?retryWrites=true&w=majority&appName=GoldenTriumph';
mongoose.connect(dbURI)
.then((result) => app.listen(8080))
.catch((err) => console.log('err'));
const store = new MongoDBStore({
    uri: dbURI,
    collection: "sessions",
  });

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(homeRoutes);
app.use(menRoutes);
app.use(womenRoutes);
app.use(aboutRoutes);
app.use(contactRoutes);
app.use(cartRoutes);
app.use(formRoutes);
app.use(passwordRoutes);
app.use(adminRoutes);
app.use(_404Routes);