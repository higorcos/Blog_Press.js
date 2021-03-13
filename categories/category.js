const Sequelize = require('sequelize')
const connection = require('../database/database')


const category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: { //url exetempo 'dados do site' slug disso 'dados-do-site'
        type: Sequelize.STRING,
        allowNull: false
    }
})
category.sync({force: false})// Vai criar a tabela quando ela ainda não existir 
//category.sync({force: true})// vai forçar a criação da tabela
module.exports = category;