var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var app = express();

var port = 8000;

app.engine('handlebars', exphbs({ defaultLayout: null }))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

var availablePeople = [
  'luke',
  'leia',
  'rey',
  'finn',
  'r2d2'
];

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (availablePeople.indexOf(person) >= 0) {
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
    res.status(200).render('photoPage', {
      name: "Luke Skywalker",
      url: "http://placekitten.com/480/480?image=9",
      caption: "Luke as a kitty (from the server)",
      displayIfContent: true
    })
  } else {
    next();
  }
});

app.get("*", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
