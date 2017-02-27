/*cria um module e direciona para um controlador */
angular.module('bovespaApp', ['angularUtils.directives.dirPagination']).controller('bovespaListController', ['$http', '$scope', function($http, $scope){
  
  /* Declaração do socketio no cliente */
  var socket = io();

  $scope.dataHeader = [];
  $scope.dataCotacao = [];
  $scope.dataTrailer = [];

  $scope.contadornotificacao = 0;

  /* Buscar Informações da rota /filesCargaInicial no servidor */
  $http({method: 'GET', url: '/filesCargaInicial'}).then(function successCallback(data) {

      if(data.data.length == 0){
        alert("Nenhum Arquivo no Servidor!");
      }
      /* Recebe o objeto e guarda em arquivos */
      $scope.arquivos = data.data;

  }, function errorCallback(response) {
    console.log(response.data + " Status: " + response.status + " - " + response.statusText);
  });


  /* Buscar Informações da rota /dataHeader no servidor */
    $http({method: 'GET', url: '/dataBovespa'}).then(function successCallback(data) {
       /* Recebe o objeto GET por /data */
      $scope.dataHeader = data.data;
      $scope.dataHeader.bovespaHeaderData = data.data[0];
      $scope.dataCotacao.bovespaCotacaoData = data.data[1];
      $scope.dataTrailer.bovespaTrailerData = data.data[3]; 

   }, function errorCallback(response) {
     console.log('Erro ao receber arquivo: ' + response);
   });

  /******* Serviço de Arquivos *******/
  $scope.capturaArquivoSelecionado = function(nome_arquivo){

    socket.emit("arquivoSelecionado", nome_arquivo);
    
  };
  
  /* Ativa serviceMonitorArquivos Cliente */
  socket.emit("serviceMonitorArquivos", "Ativando serviceMonitorArquivos Cliente");
  
  /* Escutando serviceMonitorArquivos no servidor */
  socket.on("serviceMonitorArquivos", function(arquivosData){

    /* Atualiza a variável arquivos */
    $scope.arquivos = arquivosData;

    /* Atualiza o scopo */
    $scope.$apply();

  });

  socket.on('arquivoSelecionado', function(arquivo) {
    $scope.dataHeader.bovespaHeaderData = arquivo[0];
    $scope.dataCotacao.bovespaCotacaoData = arquivo[1];
    $scope.dataTrailer.bovespaTrailerData = arquivo[3];
    $scope.$apply();
  }); 

  socket.on('serviceMonitorArquivosAlerta', function(arquivo) {
    console.log(arquivo);
    $scope.contadornotificacao++;
    $scope.$apply();
  });


}]);