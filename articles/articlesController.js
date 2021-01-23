const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('../categories/category')
const Article = require('../articles/articles')
const slugify = require('slugify')

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/admin/articles',(req,res) =>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
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

router.post("/admin/articles/delete", (req,res)=> {

    let id_to_delete = req.body.id;
    if(id_to_delete != undefined){
        if(!isNaN(id_to_delete)){
            Article.destroy({
                where:{
                    id:id_to_delete
                }
            }).then(()=>{
                res.redirect('/admin/articles');
            })
        }else{
            res.redirect('/admin/articles')
        }
    }else{
        res.redirect('/admin/articles')
    }
})

router.get("/admin/articles/edit/:id", (req,res)=>{
    let idSearch = req.params.id;
    if(isNaN(idSearch)){
        res.redirect('/admin/articles')
    }else{
        Article.findByPk(idSearch).then(article => {
            if(article != undefined){
                res.render('admin/articles/edit', {article: article})
            }else{
                res.redirect('/admin/articles') 
            }
        }).catch(erro => {
             res.redirect('/admin/articles')
        })
    }
})

router.post('/admin/articles/update', (req,res) => {
    let idUp = req.body.id;
    let titleUp = req.body.title;
    //let categoryUp = req.body.category

    Article.uptade({ title: titleUp, slug: slugify(titleUp)},{
        where: {
            id:idUp
        }
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})


module.exports = router;