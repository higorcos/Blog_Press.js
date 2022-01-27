const Sequelize = require('sequelize');
const connection = require('../database/database')
const category = require('../categories/category')


const article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: { //url exemplo 'dados do site' slug disso 'dados-do-site'
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


category.hasMany(article); //relacionamento 1 para M(muitos) com sequelize
article.belongsTo(category); //relacionamento 1 para 1 com sequelize

article.sync({force: false})// Vai criar a tabela quando ela ainda não existir 
//article.sync({force: true})// vai forçar a criação da tabela

module.exports = article;