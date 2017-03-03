/* verbose() debugar */
var sqlite3 = require('sqlite3').verbose();
var db;

function createDB(){

	console.log('Criando o DB');

	/* 
	* Criando um banco chamado aula.sqlite3
	* define uma função não obrigatória chamada create table
	*/
	db = new sqlite3.Database('aula.sqlite3', createTable);

}

/*
* db.run executar comandos sql
*/
function createTable(){
	console.log('createTable na aula2');
	db.run('CREATE TABLE IF NOT EXISTS aula2 (info TEXT)', insertRows);
}

function insertRows(){
	console.log('Inserindo linhas...');

	/* 
	* ? insere qualquer valor na tabela 
	* ++i é mais eficiente se der pra usar
	*/
	var stmt = db.prepare('INSERT INTO aula2 VALUES(?)');

	for (var i = 0; i < 10; i++) {
		stmt.run('numero:'+i);
	}

	console.log("antes do finalize");
	/* Commit/ Rollback */
	stmt.finalize(readAllRows);

	console.log("depois do finalize");
}

function readAllRows(){
	console.log('lendo tabela aula2');

	db.all('SELECT rowid as id, info FROM aula2', function(err, rows){

		rows.forEach(function(row){
			console.log(row.id + ' : '+row.info);
		});

		/*
		* Fecha o arquivo do banco para não gerar inconsistencias
		*/
		closeDB();

	});
}

function closeDB(){
	console.log('closeDB');
	db.close();
}

function runChainExample(){
	createDB();
}

runChainExample();