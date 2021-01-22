const Sequelize = require("sequelize");

const connection = new Sequelize('Press.js','root','password',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'//horario  para os horário do banco de dados

});

module.exports = connection;
