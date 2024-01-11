const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const { sequelize } = require('./connection');

const { Kategorie } = require('./connection');

Kategorie.findAll()
  .then(kategorie => {
    console.log(kategorie);
  })
  .catch(err => {
    console.error(err);
  });

/*
// Funkce pro získání kategorií z databáze
async function getCategories() {
  // Získání dat z databáze
  const categories = await sequelize.query('SELECT nazev FROM kategorie', { type: sequelize.QueryTypes.SELECT});

  // Vytvoření HTML kódu na základě dat z databáze
  const categoriesHTML = categories.map(category => `
    <li class="nav-item">
      <a class="nav-link bg_primary_color" href="#">${category.nazev}</a>
    </li>
  `).join('');

  // Odeslání HTML kódu jako odpověď
  return `<div id="navbarsExample04"><ul>${categoriesHTML}</ul></div>`;
}
*/
export default app;

