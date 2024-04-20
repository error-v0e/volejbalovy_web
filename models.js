const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./user_db');


const User = sequelize.define('user', {
    email: {
    type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
}, {freezeTableName: true,});

sequelize.sync();
  
module.exports = User;
