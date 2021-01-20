const express = require('express');
const category = require('../categories/category');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('../categories/category')

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/articles',(req,res) =>{
    res.send('Rota dos artigos');
})
router.get('/admin/articles/new',(req,res) =>{
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})
module.exports = router;