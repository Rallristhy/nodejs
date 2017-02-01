/* Importando express */
const express = require ('express');
const app = express();

app.use("/bower_components",  express.static(__dirname + '/bower_components'));
app.use("/views",  express.static(__dirname + '/views'));

app.get ('/', function (request, response){
  response.sendFile(__dirname + '/views/index.html');
});

app.listen (3000, function(){
  console.log ('Server running...');
});
