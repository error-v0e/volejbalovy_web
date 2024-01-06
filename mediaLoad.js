const express = require('express');
const app = express();
const connection = require('./connection');

// Vytvoření cesty pro získání dat z databáze
app.get('/getCategories', (req, res) => {
    // Získání dat z databáze
    connection.query('SELECT nazev FROM kategorie', (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Vytvoření HTML kódu na základě dat z databáze
      const categoriesHTML = results.map(category => `
        <li class="nav-item">
          <a class="nav-link bg_primary_color" href="#">${category.nazev}</a>
        </li>
      `).join('');
  
      // Odeslání HTML kódu jako odpověď
      res.send(`<div id="navbarsExample04"><ul>${categoriesHTML}</ul></div>`);
    });
  });
  
  // Spuštění serveru
  const PORT = 3306;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });