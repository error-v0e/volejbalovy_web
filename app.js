const express = require('express');
const path = require('path');
const sequelize = require('./connection'); 
const {Klub, Kategorie, Universal, Sponzor, Pohlavi, Tag, Tym, Prispevek, Tags, Sit} = require('./item'); 

var home_routes = require('./routes/home.routes');
var media_routes = require('./routes/media.routes');
var nabor_routes = require('./routes/nabor.routes');
var kontakty_routes = require('./routes/kontakty.routes');

const app = express();
app.use(express.static('public'));
// Nastavení view engine na EJS
app.set('view engine', 'ejs');

// Nastavení adresáře views
app.set('views', path.join(__dirname, 'views'));

// Middleware pro zpracování JSON a URL-encoded těl požadavků
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home_routes);
app.use('/media', media_routes);
app.use('/nabor', nabor_routes);
app.use('/kontakty', kontakty_routes);


app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});