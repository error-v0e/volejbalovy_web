const express = require('express');
const path = require('path');
const {Klub, Kategorie, Universal, Sponzor, Pohlavi, Tag, Tym, Prispevek, Tags, Sit} = require('./item'); 
const passport = require("passport");
const { User } = require("./models"); // Assuming you have defined your User model with Sequelize
const localStrategy = require("./passp.js");
const controllers = require("./controllers.js");
const cookieParser = require("cookie-parser");
const sequelize = require("./user_db.js"); // Assuming this file initializes and exports your Sequelize instance
const ejs = require("ejs");
const bodyParser = require("body-parser");
const routes = require("./admin_pages.js");
const session = require("express-session");


var home_routes = require('./routes/home.routes');
var media_routes = require('./routes/media.routes');
var nabor_routes = require('./routes/nabor.routes');
var kontakty_routes = require('./routes/kontakty.routes');

const app = express();
app.use(express.static('public'));
sequelize.authenticate(); // Test the connection
app.use(
    session({
        secret: "GFGLogin346",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findByPk(id) // Use findByPk with Sequelize
        .then((user) => done(null, user))
        .catch((err) => done(err));
});

// Nastavení adresáře views
app.set('views', path.join(__dirname, 'views'));

// Middleware pro zpracování JSON a URL-encoded těl požadavků
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home_routes);
app.use('/media', media_routes);
app.use('/nabor', nabor_routes);
app.use('/kontakty', kontakty_routes);
app.use("/api/", controllers); // Path to your authentication routes file
app.use("/", routes);


app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});