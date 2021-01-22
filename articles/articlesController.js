const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('../categories/category')
const Article = require('../articles/articles')
const slugify = require('slugify')

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/admin/articles',(req,res) =>{
    Article.findAll().then(articles => {
        res.render('admin/articles/index',{articles:articles});
    })
})
router.get('/admin/articles/new',(req,res) =>{
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})
router.post('/articles/save',(req,res) => {
    let titleArticle = req.body.titleArticle
    let textArticle = req.body.textArticle
    let category = req.body.category

    if(titleArticle != undefined && textArticle != undefined){
        Article.create({
            title:titleArticle ,
            slug:slugify(titleArticle ),
            body:textArticle,
            categoryId: category
        }).then(() => {
            res.redirect('/admin/articles')
        })
    }else{
        res.redirect('/')
    }
})
module.exports = router;