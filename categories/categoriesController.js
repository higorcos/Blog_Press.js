const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('./category')
const slugify = require('slugify');// biblioteca para transformar texto em url 

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/admin/categories/new',(req,res) =>{
    res.render('admin/categories/new')
})
router.post('/categories/save',(req,res) =>{
    var titleCategory = req.body.titleCategory;
    if(titleCategory != undefined){
        Category.create({
            title: titleCategory,
            slug: slugify(titleCategory)
        }).then(() => {
            res.redirect('/')
        })
    }else{
        res.redirect("/admin/categories/new");
         
    }

});
router.get("/admin/categories", (req,res) => {
    res.render('admin/categories/index')
})
module.exports = router;