const Sequelize = require("sequelize");

const connection = new Sequelize('Press.js','root','password',{
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = connection;
