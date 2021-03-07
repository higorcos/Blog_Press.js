const express = require("express");
const router = express.Router();
const User = require('./user');
const bcrypt = require('bcryptjs');//biblioteca para fazer o hash de senha 


router.get('/admin/users', (req,res)=> {
    res.send('Listagem de usuários')
})

router.get('/user/create', (req,res) => {
    res.render('admin/users/create')
})
router.post('/user/save', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user =>{
        if(user == undefined){
        var salt = bcrypt.genSaltSync(10); // uma segurança extra   
        var hash = bcrypt.hashSync(password, salt);
    
        User.create({
            email: email,
            password: hash
        }).then(() =>{
            res.json({email, hash})
        }).catch((err)=>{
           res.redirect('/')
        })
    }else{
        res.redirect('/user/create')
    }
    })

})

module.exports = router;
