# nodejs
NodeJS (Construção de Software II)
<!DOCTYPE html>
<html ng-app="todoApp">
<head>
   <meta charset="utf-8">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
  <script src="todo.js"></script>
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <title>Exemplo Node</title>
</head>
<body class="container">
    <h2> Todo List</h2>
    <div ng-controller="TodoListController as todoList">
      {{1+2}}   
      <form>
	  <p>Enter your name:
	    <input type="text" ng-model="name" required>
	    <button type="button" ng-disable="!name">Submit</button>
	  </p>
	  <p ng-show="name">
	    Hello, {{name}}
	  </p>
     </form>	    
   </div>
</body>
</html>
