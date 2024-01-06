function showFilterMenu() {
    document.querySelector('.filter-box').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/getCategories') // Použijte skutečnou cestu k datům na serveru
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbarsExample04').innerHTML = data;
      })
      .catch(error => console.error('Error fetching categories:', error));
  });