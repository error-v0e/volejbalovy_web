const express = require('express');
const ejs = require('ejs');
const sequelize = require('../connection'); 
const {Klub, Kategorie, Universal, Sponzor, Pohlavi, Tag, Tym, Prispevek, Tags, Sit} = require('../item'); 



const app = express();



app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const items = await sequelize.findAll();
    res.render('index', { items }); // Použití EJS šablony "index.ejs" zde
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru');
  }
});