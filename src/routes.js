const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {

    if(req.session.loggedin){
        res.json('logado');
    } else {
        res.json('Log in please!');
    }
    
})

routes.post('/login', (req, res) => {

    var dados = req.body.name;

    if(dados.trim()){

        console.log(dados);

        req.session.loggedin = true;
        req.session.user = dados.name;
        res.setHeader('Content-Type', 'text/html');
        res.json(dados);
        console.log('Successfully logged in')

    } else {
        res.json('Fill in the name field');
    }
})

module.exports = routes;