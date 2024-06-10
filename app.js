const express = require('express');
const path = require('path');
const passport = require("passport");
const { User } = require("./models"); 
const controllers = require("./controllers.js");
const cookieParser = require("cookie-parser");
const sequelize = require("./user_db.js"); 
const localStrategy = require("./passp.js"); //Nemazat!!!!!!!!!!!!
const bodyParser = require("body-parser");
const sprava_routes = require("./admin_pages.js");
const session = require("express-session");


var home_routes = require('./routes/public/home.routes.js');
var media_routes = require('./routes/public/media.routes');
var universal_routes = require('./routes/public/universal.routes.js');
var tymy_routes = require('./routes/public/tymy.routes');
var kalendar_routes = require('./routes/public/kalendar.routes');

const app = express();
app.use(express.static('public'));
sequelize.authenticate(); 
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
    User.findByPk(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});


app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home_routes);
app.use('/tymy/', tymy_routes);
app.use('/kalendar', kalendar_routes);
app.use('/media', media_routes);
app.use('/', universal_routes);
app.use("/api/", controllers); 
app.use("/", sprava_routes);


app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});