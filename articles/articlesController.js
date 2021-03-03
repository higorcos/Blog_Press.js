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
        Article.findByPk(idSearch).then(articles => {
            if(articles != undefined){  
                Category.findAll().then(categories => {           
             res.render('admin/articles/edit', {articles: articles, categories: categories});
                })        
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
    let bodyUP = req.body.bodyText;
    let categoryUp = req.body.category

    Article.update({ title: titleUp, slug: slugify(titleUp), body: bodyUP, categoryId: categoryUp},{
        where: {
            id:idUp
        }
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num', (req,res)=> { //vai dividir os artigos em diferentes paginas
    let page = req.params.num;
    let offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = parseInt(page) * 4
    }

    Article.findAndCountAll({ //conta o resultado da pesquisa no banco de dado
        limit: 4,//número de elemento por página
        offset: offset //o offset identifica qual será o começo na fila. Exemplo o offset é 6, a contagem começa do seis até chegar no limite estipulado pelo limit(4) no caso seria até o 9(6,7,8,9) 
    }).then(articles => {
        let next;
        if(offset + 4 >= articles.count){
            next = false
        }else{
            next = true;
        }
        var result = {
            next: next,
            articles : articles
        }
        Category.findAll().then(categories => {
            res.render('admin/articles/page',{result: result, categories: categories})
        })
        //res.json(result)
    })
})

module.exports = router;