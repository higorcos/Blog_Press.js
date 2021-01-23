const express = require('express');
const router = express.Router();//.Router para criar manipuladores de rota modulares e montáveis.
const Category = require('./category')
const slugify = require('slugify');// biblioteca para transformar texto em url 

//const category = require('./category');

//o router faz a dritribuição de rota fora do arquivo primario 
router.get("/admin/categories", (req,res) => {

    Category.findAll({raw: true}).then(category =>{
    res.render('admin/categories/index',{categories: category });
    });
});

router.get('/admin/categories/new',(req,res) =>{
    res.render('admin/categories/new')
})
router.post('/categories/save',(req,res) =>{
    let titleCategory = req.body.titleCategory;
    if(titleCategory != undefined){
        Category.create({
            title: titleCategory,
            slug: slugify(titleCategory)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    }else{
        res.redirect("/admin/categories/new");
         
    }

});

router.post("/categories/delete", (req,res)=>{

    let id_to_delete = req.body.id;
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
});

router.get("/admin/categories/edit/:id", (req,res) => {

    let idSearch = req.params.id;
    if(isNaN(idSearch)){
        res.redirect('/admin/categories')
    }else{
    Category.findByPk(idSearch).then(category => { //findByPK pesquisar no banco de dados

        if(category != undefined){
            res.render('admin/categories/edit', {category: category})
        }else{
            res.redirect('/admin/categories')
        }
    }).catch(erro => {
        res.redirect('/admin/categories')
    });
}
});

router.post('/categories/update',(req,res)=> {
    let idUp = req.body.id;
    let titleUp = req.body.title;

    Category.update({title: titleUp, slug: slugify(titleUp)},{
        where: {
            id:idUp
        }
    }).then(()=>{
        res.redirect('/admin/categories')
    });

});

module.exports = router;