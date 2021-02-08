const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')

const routerCategories = require('./categories/categoriesController') // rotas em outro arquivo 
const routerArticles = require('./articles/articlesController')

const Article = require('./articles/articles');
const Category = require('./categories/category');
const article = require('./articles/articles');

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
    Article.findAll({order: [['id','DESC']]}).then(articles =>{
        res.render('index',{articles: articles});

    });
})

app.get('/:slug', (req,res)=> {
    let slugSearch = req.params.slug;
    Article.findOne({
        where:{
            slug:slugSearch
        
        }
    }).then(article=>{
        if(article != undefined){
            res.render('article',{article: article});
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/')
    })
});

app.listen(8080,()=>{
    console.log('..........Servidor online');
})