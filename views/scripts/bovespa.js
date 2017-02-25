/*cria um module e direciona para um controlador */
angular.module('bovespaApp', ['angularUtils.directives.dirPagination']).controller('bovespaListController', ['$http', '$scope', function($http, $scope){
  
  /* Declaração do socketio no cliente */
  var socket = io();

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
  $http({method: 'GET', url: '/dataHeader'}).then(function successCallback(data) {
      /* Recebe o objeto GET por /data */
      $scope.dataHeader = data.data;

  }, function errorCallback(response) {
    console.log('Erro ao receber arquivo: ' + response);
  });

  /* Buscar Informações da rota /dataCotacao no servidor */
  $http({method: 'GET', url: '/dataCotacao'}).then(function successCallback(data) {
      
      /* Recebe o objeto GET por /data */
      $scope.dataCotacao = data.data;

  }, function errorCallback(response) {
    console.log('Erro ao receber arquivo: ' + data);
  });

  /* Buscar Informações da rota /dataTrailer no servidor */
  $http({method: 'GET', url: '/dataTrailer'}).then(function successCallback(data) {
      
      /* Recebe o objeto GET por /data */
      $scope.dataTrailer = data.data;

  }, function errorCallback(response) {
    console.log('Erro ao receber arquivo: ' + data);
  });


  /******* Serviço de Arquivos *******/
  $scope.capturaArquivoSelecionado = function(nome_arquivo){
    console.log(nome_arquivo);
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



}]);