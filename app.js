const express = require('express');
const path = require('path');
const passport = require("passport");
const { User } = require("./models"); 
const controllers = require("./controllers.js");
const cookieParser = require("cookie-parser");
const sequelize = require("./user_db.js"); 
const bodyParser = require("body-parser");
const sprava_routes = require("./admin_pages.js");
const session = require("express-session");


var home_routes = require('./routes/home.routes');
var media_routes = require('./routes/media.routes');
var nabor_routes = require('./routes/nabor.routes');
var kontakty_routes = require('./routes/kontakty.routes');
var tymy_routes = require('./routes/tymy.routes');

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
app.use('/media', media_routes);
app.use('/nabor', nabor_routes);
app.use('/kontakty', kontakty_routes);
app.use('/tymy/', tymy_routes);
app.use("/api/", controllers); 
app.use("/", sprava_routes);


app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});