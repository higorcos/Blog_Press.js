const express = require("express");
const router = express.Router();
const User = require('./user');
const bcrypt = require('bcryptjs');//biblioteca para fazer o hash de senha 
const adminAuth = require('../middleware/adminAuth') //middleware(autenticação para rotas administrativas)


router.get('/admin/users',adminAuth ,(req,res)=> {
    res.send('Listagem de usuários')
})

router.get('/user/create', (req,res) => {
    res.render('admin/users/create')
})
router.post('/user/save',(req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ //verifica se o email já existe no servidor          
        where: {email: email}
    }).then(user =>{
        if(user == undefined){ // se não existir, vai criar uma conta 
        var salt = bcrypt.genSaltSync(10); // uma segurança extra   
        var hash = bcrypt.hashSync(password, salt);
    
        User.create({
            email: email,
            password: hash
        }).then(() =>{ 
            res.redirect('/user/login')//Não conecta logo após a criação do usuário 
        }).catch((err)=>{
           res.redirect('/');
        })
    }else{// se o já foi cadastrado 
        res.redirect('/user/create');
    }
    })

});

router.get('/user/login',(req,res)=>{
    res.render('admin/users/login')
})
router.post('/authenticate',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where:{email: email}
    }).then(user =>{
       if(user != undefined){
            var correct = bcrypt.compareSync(password,user.password);//vai verificar se as senhas são a mesma
            if(correct){
                //Vai salvar os dados da sessão 
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            }else{
                res.redirect('user/login');
            }
        }else{
            res.redirect('user/login');
        }
    })
});

router.get('/logout', (req,res)=>{
    req.session.user == undefined;
    res.redirect('/');
})

module.exports = router;
