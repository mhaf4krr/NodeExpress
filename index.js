const express = require('express');

const fs = require('fs');

// require handle bar for injecting dynamic code and reusibility
const hbs = require('hbs')

const app = express();

// declaring partials to handlebar

hbs.registerPartials(__dirname + '/views/partials')

// creating helper functions for handlebar

hbs.registerHelper('COPYRIGHT' , () => `MUFTI HYDER ALI`)

// declaring view engine as hbs
app.set('view engine','hbs');

// using dynamic defualt dir -> a middleware
app.use(express.static(__dirname + '/public'));

//middle ware extends the existing capabilities of express app.use registers a middleware
// it has 3arguments req,res,next . Next tells it to terminate and continue with other 
// incase next is missing it freeezes

let Log = (req,res,next) => {
    
    let info = `\ntime : ${new Date()} , Request Method ${req.method} Requested Url ${req.url}`;
    console.log(info)
    fs.appendFileSync('server-log.txt',info)
    next();
}


app.use(Log)

// making a root route 

app.get('/' , (req , res) => {
    res.render('home.hbs', {
        title : 'Home Page',
        message : 'Welcome to our site',
        
    });
})

// making  a route
app.get('/about' , (req , res) => {
    res.render('about.hbs',{
        title : "About" ,
        currentInfo : new Date(),
        
    });
})

//partial is a peice of website like a header or footer ,


// opening  a port for server
app.listen(3005);