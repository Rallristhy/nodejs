const express = require ('express');
const app = express();

app.get ('/', function (request, response){
  response.render ('index.ejs');
});

app.listen (3000, function(){
  console.log ('Server running...');
});
