const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/articles',(req,res) =>{
    res.send('Rota dos artigos');
})
router.get('/admin/articles/new',(req,res) =>{
    res.send('Rota para criar um novo artigo');
})
module.exports = router;