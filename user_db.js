const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('v', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to SQL database');
  } catch (err) {
    console.error('Error connecting to SQL database:', err);
  }
};

module.exports = sequelize;