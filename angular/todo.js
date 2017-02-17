/*cria um module e direciona para um controlador */
angular.module('todoApp', []).controller('TodoListController', function(){
  /*Aponta todoList para o this que é o controlador na view*/
  var todoList = this;
  
  /*Array que será visivel pelo controller e pela view*/
  todoList.todos = [
  {text : 'Levar o lixo pra fora.',
   done : true
  },
  {text : 'Terminar trabalho da faculdade.',
   done : false
  }
  ];
  
  todoList.addTodo = function(){
    todoList.todos.push({text : todoList.todoText, done : false});
    todoList.todoText = '';
  }
  
  todoList.remaining = function(){
      var count = 0;
      
      /* ? = se true : = senao */
      angular.forEach(todoList.todos, function(todo){
	count += todo.done ? 0 : 1;
      });
      
      return count;
  };
  
  todoList.archive = function(){
      /*Backup*/
      var oldTodos = todoList.todos;
      /*Limpa vetor*/
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo){
	/*Armazena apenas false*/
	if(!todo.done){
	  todoList.todos.push(todo);
	}
      });
  };
  
});