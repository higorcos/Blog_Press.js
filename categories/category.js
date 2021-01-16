const { Sequelize } = require("sequelize")
const Sequelize = require("sequelize")
const connection = require("../database/database")

const category = connection.define('categories',{
    title:{
        type: Sequelize.toString,
        allowNull: false
    },slug:{ //url exetempo 'dados do site' slug disso 'dados-do-site'
        type: Sequelize.toString,
        allowNull: false
    }
})
module.exports = category;