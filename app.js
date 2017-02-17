/* Importando express */
const express = require ('express');
const app = express();

/* Importando File System */
var fs = require('fs');

/* Mapeando caminhos para visibilidade nas views */
app.use("/bower_components",  express.static(__dirname + '/bower_components'));
app.use("/node_modules",  express.static(__dirname + '/node_modules'));
app.use("/views",  express.static(__dirname + '/views'));

/* Criando Objetos para guardar as informações do  */
class bovespaHeader {
	constructor(h_tipo_registro, h_nome_arquivo, h_codigo_da_origem, h_data_geracao_do_arquivo, h_reserva) {
	this.h_tipo_registro = h_tipo_registro;
	this.h_nome_arquivo = h_nome_arquivo;
	this.h_codigo_da_origem = h_codigo_da_origem;
	this.h_data_geracao_do_arquivo = h_data_geracao_do_arquivo;
	this.h_reserva = h_reserva;
  }
};

class bovespaCotacao {
	constructor(c_tipo_registro, c_data_do_pregao, c_codigo_bdi, c_codigo_de_negociacao_do_papel, c_tipo_de_mercado, c_nomres, c_especificacao_do_papel, c_prazot, c_moeda_de_referencia, c_preabe, c_premax, c_premin, c_premed, c_preult, c_preofc, c_preofv, c_totneg, c_quatot, c_voltot, c_preexe, c_idopc , c_datven, c_fatcot, c_ptoexe, c_codisi, c_dismes) {
	this.c_tipo_registro = c_tipo_registro;                
	this.c_data_do_pregao = c_data_do_pregao;              
	this.c_codigo_bdi = c_codigo_bdi;                   
	this.c_codigo_de_negociacao_do_papel = c_codigo_de_negociacao_do_papel;
	this.c_tipo_de_mercado = c_tipo_de_mercado;              
	this.c_nomres = c_nomres;                       
	this.c_especificacao_do_papel = c_especificacao_do_papel;       
	this.c_prazot = c_prazot;                       
	this.c_moeda_de_referencia = c_moeda_de_referencia;          
	this.c_preabe = c_preabe;                       
	this.c_premax = c_premax;                       
	this.c_premin = c_premin;                       
	this.c_premed = c_premed;                       
	this.c_preult = c_preult;                       
	this.c_preofc = c_preofc;                       
	this.c_preofv = c_preofv;                       
	this.c_totneg = c_totneg;                       
	this.c_quatot = c_quatot;                       
	this.c_voltot = c_voltot;                       
	this.c_preexe = c_preexe;                       
	this.c_idopc  = c_idopc ;                       
	this.c_datven = c_datven;                       
	this.c_fatcot = c_fatcot;                       
	this.c_ptoexe = c_ptoexe;                       
	this.c_codisi = c_codisi;                       
	this.c_dismes = c_dismes;
  }
};

class bovespaTrailer {
	constructor(t_tipo_registro, t_nome_arquivo, t_codigo_da_origem, t_data_geracao_do_arquivo, t_total_registros, t_reserva) {
	this.t_tipo_registro = t_tipo_registro;
	this.t_nome_arquivo = t_nome_arquivo;
	this.t_codigo_da_origem = t_codigo_da_origem;
	this.t_data_geracao_do_arquivo = t_data_geracao_do_arquivo;
	this.t_total_registros = t_total_registros;
	this.t_reserva = t_reserva;
  }
};

/* Vetores para guardar as informações */
var bovespaHeaderData = bovespaHeaderData || [];
var bovespaCotacaoData = bovespaCotacaoData || [];
var bovespaTrailerData = bovespaTrailerData || [];

/* Fazendo a leitura do arquivo */
fs.readFile('resources/COTAHIST_M122016.TXT', function (err, data) {
   
	/* Tratamento caso dê algum erro ao abrir/ler o arquivo */
	if (err) {
		return console.error(err);
	}

   	/*Convertendo informação do arquivo em string*/
   	var text = data.toString();

   	/*Quebra linha a linha e quarda em um vetor*/
   	var lines = text.split( '\n' );

   	/*Percorrendo linha a linha do Arquivo*/
   	lines.forEach(function ( line ) {

  		/*Fazendo a leitura do Header*/
		if (line.substring(0, 2) == '00'){
			var h_tipo_registro = line.substring(0, 2);
		 	var h_nome_arquivo = line.substring(2, 15);
		 	var h_codigo_da_origem = line.substring(15, 23);
		 	var h_data_geracao_do_arquivo = line.substring(23, 31);
		 	var h_reserva = line.substring(31, 245);
		 	
		 	var bovespah = new bovespaHeader(h_tipo_registro, h_nome_arquivo, h_codigo_da_origem, h_data_geracao_do_arquivo, h_reserva);
			bovespaHeaderData.push(bovespah);
			
		}
		
		/*Fazendo a leitura do Cotações*/
		else if (line.substring(0, 2) == '01'){
			var c_tipo_registro = parseInt(line.substring(0, 2));
			var c_data_do_pregao = parseInt(line.substring(2, 10));
			var c_codigo_bdi = line.substring(10, 12);
			var c_codigo_de_negociacao_do_papel = line.substring(12, 24);
			var c_tipo_de_mercado = line.substring(24, 27);
			var c_nomres = line.substring(27, 39);
			var c_especificacao_do_papel = line.substring(39, 49);
			var c_prazot = line.substring(49, 52);
			var c_moeda_de_referencia = line.substring(52, 56);
			var c_preabe = (parseInt((line.substring(56, 69)))/100).toFixed(2);
			var c_premax = line.substring(69, 82);
			var c_premin = line.substring(82, 95);
			var c_premed = line.substring(95, 108);
			var c_preult = line.substring(108, 121);
			var c_preofc = line.substring(121, 134);
			var c_preofv = line.substring(134, 147);
			var c_totneg = line.substring(147, 152);
			var c_quatot = line.substring(152, 170);
			var c_voltot = line.substring(170, 188);
			var c_preexe = line.substring(188, 201);
			var c_idopc = line.substring(201, 202);
			var c_datven = line.substring(202, 210);
			var c_fatcot = line.substring(210, 217);
			var c_ptoexe = line.substring(217, 230);
			var c_codisi = line.substring(230, 242);
			var c_dismes = line.substring(242, 245);

			var bovespac = new bovespaCotacao(c_tipo_registro, c_data_do_pregao, c_codigo_bdi, c_codigo_de_negociacao_do_papel, c_tipo_de_mercado, c_nomres, c_especificacao_do_papel, c_prazot, c_moeda_de_referencia, c_preabe, c_premax, c_premin, c_premed, c_preult, c_preofc, c_preofv, c_totneg, c_quatot, c_voltot, c_preexe, c_idopc , c_datven, c_fatcot, c_ptoexe, c_codisi, c_dismes);
			bovespaCotacaoData.push(bovespac);
		}

		/*Fazendo a leitura do Trailer*/
		else if (line.substring(0, 2) == '99'){
			var t_tipo_registro = line.substring(0, 2);
			var t_nome_arquivo = line.substring(2, 15);
			var t_codigo_da_origem = line.substring(15, 23);
			var t_data_geracao_do_arquivo = line.substring(23, 31);
			var t_total_registros = parseInt(line.substring(31, 42));
			var t_reserva = line.substring(42, 245);

			var bovespat = new bovespaTrailer(t_tipo_registro, t_nome_arquivo, t_codigo_da_origem, t_data_geracao_do_arquivo, t_total_registros, t_reserva);
			bovespaTrailerData.push(bovespat);
		}

	});

});

/* Rota Padrão */
app.get ('/', function (request, response){
	response.sendFile(__dirname + '/views/index.html');
});

/* Rotas Data para Front */
app.get('/dataHeader', function(request, response){
	response.send({bovespaHeaderData});
});

app.get('/dataTrailer', function(request, response){
	response.send({bovespaTrailerData});
});

app.get('/dataCotacao', function(request, response){
	response.send({bovespaCotacaoData});
});

/* Listando APP na porta 3000 */
app.listen (3000, function(){
	console.log ('Server running...');
});
