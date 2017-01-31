/* Importando express */
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

/* app usara o bodyParser
 * use interpreta as requisições é um midleware
 */
app.use(bodyParser.urlencoded({extended : true}));

/* Arquivos de visão terão a extensão ejs */
app.set('view engine', 'ejs');

app.get ('/', function (request, response){
  response.render ('index.ejs');
});

app.listen (3000, function(){
  console.log ('Server running...');
});
