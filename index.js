const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const path = require('path');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 's0m3th1ng',
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser('s0m3th1ng'));
let visited = 0;

const urlencoderParser = express.urlencoded({
    extended: false
});

//---------------------Cookies----------------------------
app.get('/index', (req, res) => {
    visited++;
    res.cookie('visited', visited, { maxAge: 99999999999999999999999999999 });

    if (req.cookies.beenHereBefore == 'yes') {
        //have been before show login page
        res.send(`Already has account. Visited ${req.cookies.visited} times.`);
        checkAuth;
    } else {
        res.cookie('beenHereBefore', 'yes', { maxAge: 99999999999999 });
        //have not been before show create user
        visited = 0;
        res.redirect('/login');

    }
});

//------------------Authentication----------------------
const checkAuth = (req, res, next) => {
    if (res.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

//-------------------Login------------------------------
app.get('/login', routes.login);

app.post('/login', urlencoderParser, async (req, res) => {
    let username = req.body.username;
    let loginbanana = req.body.password;
    let url = `http://localhost:3000/getUser?username=${username}`;
    const response = await fetch(url);
    const data = await response.json();
    if (bcrypt.compareSync(loginbanana, data.password)) {
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        }
        res.redirect('/index');
    } else {
        //login information is not valid
        console.log("Login information is incorrect")
        res.redirect('/login');
    }
});

//------------------Logout--------------------------------
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login')
        }
    })
});

//-------------------Create User------------------------
app.get('/newUser', routes.createLogin)
app.post('/newUser', urlencoderParser, routes.createAccount)

app.get('/getUser', routes.getUser);

app.listen(3000);

console.log('Running at Port 3000');