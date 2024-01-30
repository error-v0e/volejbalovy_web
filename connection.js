const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('vkteplice', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});



module.exports = sequelize;