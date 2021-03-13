const Sequelize = require('sequelize')
const connection = require('../database/database')


const user = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: { //url exetempo 'dados do site' slug disso 'dados-do-site'
        type: Sequelize.STRING,
        allowNull: false
    }
})
user.sync({force: false})// Vai criar a tabela quando ela ainda não existir 
//user.sync({force: true})// vai forçar a criação da tabela
module.exports = user;