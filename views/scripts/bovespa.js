/*cria um module e direciona para um controlador */
angular.module('bovespaApp', []).controller('bovespaListController', ['$http', '$scope', function($http, $scope){
  /*Aponta todoList para o this que é o controlador na view*/
  var bovespaList = this;
  
  /* Buscar Informações da rota /data no servidor */
  $http({method: 'GET', url: '/dataHeader'}).then(function successCallback(data) {
      
      /* Recebe o objeto GET por /data */
      $scope.data = data.data;

  }, function errorCallback(response) {
    console.log('Erro ao receber arquivo: ' + data);
  });

}]);