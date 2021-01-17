const Sequelize = require('sequelize');
const connection = require('../database/database')
const category = require('../categories/category')


const article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: { //url exetempo 'dados do site' slug disso 'dados-do-site'
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})
//article.sync({force: true})// vai forçar a criação da tabela

article.belongsTo(category); //relacinamento 1 para 1 com siquelize
category.hasMany(article); //relacinamento 1 para M(muitos) com siquelize


module.exports = article;