const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
//middlewares .

//for repeating chunks on the html page: i.e: pageTitle and footer
hbs.registerPartials(__dirname +'/views/partials');
//.set key value pair: view engine, and hbs as the view engine
//templating engine renders html but in a dynamic way: inject value inside of the template.
//reusable markup
app.set('view engine', 'hbs');
//use takes middleware functions you wnt to use
//dirname: variable passed into file by wrapper function which stores path to web-server (root of project)
app.use(express.static(__dirname+ '/public')); //express.static takes absolute path to folder you want to serve up;from the root of your project

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log +'\n');
    next();
});

// app.use((req,res, next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Website maintenance',
//     });
// });

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'unable to load page'
    });
});

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Portfolio',    
    });
});
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
