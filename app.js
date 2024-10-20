const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({origin : 'https://localhost:3000'}));
const fs = require('fs'); 
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
let errors = [];
let data = [];
let success = true;


app.get('/', (req, res) => {
    console.log(__dirname);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/lista', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(__dirname + '/public/lista.html');
});

app.post('/lista', (req, res) => {
    res.header('Content-Type', 'application/json');
    let gyumolcs = req.body;
    if(gyumolcs.megnevezes.lenght < 5){
        success = false;
        errors.push('A megnevezes hossza kisebb mint 5 karakter');
        console.log('A megnevezes hossza kisebb mint 5 karakter');
    }
    if (gyumolcs.egysegar < 1) {
        success = false;
        errors.push('A egysegar kisebb mint 1');
    }
    if ((gyumolcs.mennyisegiegyseg == 'db') || (gyumolcs.mennyisegiegyseg == 'kg')) {  
    } else {
        success = true;
        errors.push('A mennyisegiegyseg nem kg vagy db');
    }

    if (gyumolcs.mennyiseg <= 0) {
        success = false;
        errors.push('A mennyiseg kisebb mint 0');
    }
    if (success) {
        data.push(gyumolcs);
        res.status(201).send({success: true, data: data, errors: errors});
    }else{
        res.status(201).send({success: false, data: data, errors: errors});
    }

});

app.listen(port, () => {
    console.log(`Express server is live in localhost:${port}`);
});