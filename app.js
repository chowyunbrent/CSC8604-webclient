const express = require('express');
const app = express();
const path = require('path'); // a built-in module to manipulate paths
const bodyParser = require('body-parser');


let shopping = ['bread', 'milk'];

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/list', function(req, res) {
  // Check if the client can accept HTML
  if (req.accepts('html')) {
    res.render('list', {shopping: shopping});
  } else {
    // ...otherwise make the response JSON
    res.json({shopping: shopping});
  }
});



app.use(bodyParser.urlencoded({ extended: true }));

app.post('/list/add', function(req, res) {
  shopping.push(req.body.item);
  res.redirect('/list');
});

app.post('/list/remove', function(req, res) {
  let index = shopping.indexOf(req.body.item);
  if (index >= 0) {
    shopping.splice(index, 1);
  }
  res.redirect('/list');
});



app.use("/styles", express.static(path.join(__dirname, 'styles')));

app.listen(3000);
