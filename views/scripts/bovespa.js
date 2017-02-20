/*cria um module e direciona para um controlador */
angular.module('bovespaApp', ['angularUtils.directives.dirPagination']).controller('bovespaListController', ['$http', '$scope', function($http, $scope){
  
  /* Buscar Informações da rota /dataHeader no servidor */
  $http({method: 'GET', url: '/dataHeader'}).then(function successCallback(data) {
      
      /* Recebe o objeto GET por /data */
      $scope.dataHeader = data.data;

  }, function errorCallback(response) {
    console.log('Erro ao receber arquivo: ' + data);
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

  var socket = io();
  $scope.names = ["Emil", "Tobias", "Linus"];

  $scope.enviarMsg = function(msg){
    socket.emit("mensagem", msg);
    //console.log(bovespaList.msg);
  };

  socket.on("mensagem", function(msg){
    $scope.bovespaList.msgs = msg;
    /* Atualiza models */
    $scope.$apply();
  });
  


}]);