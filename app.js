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

app.get('/felvitel', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(__dirname + '/public/felvitel.html');
    
});

app.get('/lista', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(__dirname + '/public/lista.html');
    
});

/* 
app.get('/lista', function(req, res) {
    var name = 'hello';
    res.render(__dirname + "/public/lista.html", {adatok:name});
  });

  Error: No default engine was specified and no extension was provided.
    at new View (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\view.js:61:11)
    at Function.render (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\application.js:587:12)
    at ServerResponse.render (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\response.js:1049:7)
    at C:\Users\Asura\Desktop\Termék rögzítés\app.js:65:13
    at Layer.handle [as handle_request] (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\layer.js:95:5)
    at C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\Users\Asura\Desktop\Termék rögzítés\node_modules\express\lib\router\index.js:346:12)
*/

app.post('/felvitel', (req, res) => {
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
        /* 
            res.render('lista.html', { adatok:  "dog"}); 
        */
    }else{
        res.status(201).send({success: false, data: data, errors: errors});
    }
});

app.listen(port, () => {
    console.log(`Express server is live in localhost:${port}`);
});