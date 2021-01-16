const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.

//o router faz a dritribuição de rota fora do arquivo primario 
router.get('/categories',(req,res) =>{
    res.send('Rota das categorias');
})
router.get('/admin/categories/new',(req,res) =>{
    res.send('Rota para criação de novas categorias');
})
module.exports = router;