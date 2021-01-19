const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('./category')
const slugify = require('slugify');// biblioteca para transformar texto em url 
//const category = require('./category');

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

    Category.findAll({raw: true}).then(category =>{
    res.render('admin/categories/index',{categories: category });
    });
});

router.post("/categories/delete", (req,res)=>{
    var id_to_delete = req.body.id;
    if(id_to_delete != undefined){//se não for indefined
        if(!isNaN(id_to_delete)){//se for um número

            Category.destroy({//deletar dados no banco de dados 
                where: {
                    id:id_to_delete
                }
                }).then(()=>{
                    res.redirect('/admin/categories')
                })

        }else{//se não for um número
        res.redirect('/admin/categories');
        }
    }else{// se for 
        res.redirect('/admin/categories');
    
    }
})

module.exports = router;