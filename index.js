const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const path = require('path');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

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

app.get('/', (req, res) => {
    visited++;
    res.cookie('visited', visited, { maxAge: 99999999999999999999999999999 });

    if (req.cookies.beenHereBefore == 'yes') {
        //have been before show login page
        res.send(`Already has account. Visited ${req.cookies.visited} times.`);
    } else {
        res.cookie('beenHereBefore', 'yes', { maxAge: 99999999999999 });
        //have not been before show create user
        res.send('Users first time on site, give create user');
        visited = 0;
    }
})

const urlencoderParser = express.urlencoded({
    extended: false
});

app.get('/', routes.index);

app.listen(3000);