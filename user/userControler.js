const express = require("express");
const router = express.Router();
const User = require('./user');


router.get('/admin/users', (req,res)=> {
    res.send('Listagem de usuários')
})

router.get('/user/create', (req,res) => {
    res.render('admin/users/create')
})
router.post('/user/save', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.json({email, password})
})

module.exports = router;
