const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')

const routerCategories = require('./categories/categoriesController') // rotas em outro arquivo 
const routerArticles = require('./articles/articlesController')

const Article = require('./articles/articles');
const Category = require('./categories/category');
const article = require('./articles/articles');
const category = require('./categories/category');
const router = require('./categories/categoriesController');

//view engine
app.set('view engine','ejs');//para usar o ejs para carregar as páginas

//static(arquivos estaticos)
app.use(express.static('public'));

//body parser (para trabalhar com formulario)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//database
//connection (conexão com bando de dados)
connection
.authenticate()
.then(()=> {
    console.log('..........Conectado com banco de dados !!!')
}).catch((error)=>{
    console.log(error)
})

//router (rotas em outro arquivo)
app.use('/', routerCategories);
app.use('/', routerArticles);


app.get('/', (req,res) =>{
    Article.findAll(
        {order: [['id','DESC']]
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render('index',{articles: articles, categories:categories});
             })
    });
})

app.get('/:slug', (req,res)=> {
    let slugSearch = req.params.slug;
    Article.findOne({
        where:{
            slug:slugSearch
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories:categories});
                 })
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/')
    })
});

app.get('/category/:slug', (req,res) => { //rota para flitrar as caregorias
    let slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model: Article}]
    }).then(category => {

        if (category != undefined){
           Category.findAll().then(categories => {
               res.render('index', {articles: category.articles, categories: categories})//só é possivel passar achar o tabela do artigo se puxar pela tabela category
           })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

app.listen(8080,()=>{
    console.log('..........Servidor online');
})