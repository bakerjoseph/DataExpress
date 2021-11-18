const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 's0m3th1ng',
    saveUninitialized: true,
    resave: true
}));

const urlencoderParser = express.urlencoded({
    extended: false
});

app.get('/', routes.index);

app.listen(3000);