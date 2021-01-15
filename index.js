const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')

//view engine
app.set('view engine','ejs');//para usar o ejs para carregar as páginas

//static(arquivos estaticos)
app.use(express.static('public'));

//body parser (para trabalhar com formulario)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//connection (conexão com bando de dados)
connection
    .authenticate()
    .then(()=> {
        console.log('conexão com banco de dados foi um sucesso!')
    }).catch((error)=>{
        console.log(error)
    })

app.get('/', (req,res) =>{
 res.render('index');
})

app.listen(8080,()=>{
    console.log('servidor online');
})