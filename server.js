const express = require('express');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

app.listen(5000);

app.get('/', (req, res) => res.render('home'));
