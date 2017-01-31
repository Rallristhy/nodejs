/*Importando express*/
var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello 1, 2, 3');
});

app.listen (3000, function(){
  console.log ('Server running...');
});
