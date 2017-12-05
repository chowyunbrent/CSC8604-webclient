const express = require('express');
const app = express();

app.set('view engine', 'ejs');

let votes = [0, 0];
let labels = ['no', 'yes'];

app.get('/', function(req, res) {
  res.render('votes', {votes: votes, labels: labels});
});

app.post('/vote/:option', function(req, res) {
  let option = parseInt(req.params.option);
  if (option >= 0 && option < votes.length) {
    votes[option]++;
    res.send("" + votes[option]);
  } else {
    res.sendStatus(404);    // 404 = Not found
  }
});

app.listen(3000);
