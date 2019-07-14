window.todos = (function () {
    var todo = [];
    var state = "ALL";
    return {
        removetodo: function(r_todo){
                //todo = todo.filter(function(obj){
                 //   return !(obj.id === id);
               // });
               r_todo.do = 'remove';
          $.ajax({
                type: "DELETE",
                data: JSON.stringify(r_todo),
                url: "http://localhost:3000/todos/" + r_todo.id,
                contentType: 'application/json',
                success: function (data) {
                    alert(data.msg);
                    todo = data.data;
                    window.todos.getFilteredTodos(); 
                }
            })
        //   localStorage.setItem('todoList',JSON.stringify(todo));
        },

        applyFilter: function (filterName) {
            state = filterName;
        },
        getFilter: function() {
            return state;
        },
        getFilteredTodos: function () {
            if (state === "ALL") return window.todos.getAllTodos();

            if (state === "ACTIVE") return window.todos.getAllActive();

            if (state === "COMPLETED") return window.todos.getAllCompleted();
        },
        getSessiondata: function() {
            $.ajax({
                url: "http://localhost:3000/todos",
                success: function (data) {
                   // alert(data.msg);
                    todo = data.data;
                    const event = new Event('todoListUpdated');
                    event.todos = todo;
                    window.dispatchEvent(event);
                }
            });
            
            // todo = (JSON.parse(localStorage.getItem('todoList')) || [] ) ;
            // window.todos.getAllTodos();
        },
        add: function(name) {
            const singleTodo = {
                name: name,
                id: Math.random(),
                isCompleted: false,
                do: 'add'
            };
             
            $.ajax({
                type: "POST",
                data: JSON.stringify(singleTodo),
                contentType: 'application/json',
                url: "http://localhost:3000/todos",
                success: function (data) {
                    alert(data.msg);
                    window.todos.getFilteredTodos();
                }
            });

            //todo.push(singleTodo);
            //window.todos.getFilteredTodos();
            // return singleTodo;
        },
        getAllTodos: function() {
            // localStorage.setItem('todoList',JSON.stringify(todo));
           
           /*  const event = new Event('todoListUpdated');
             event.todos = todo;
            window.dispatchEvent(event);
           $.ajax({
                type: "POST",
                data: JSON.stringify(todo),
                contentType: 'application/json',
                url: "http://localhost:3000/saveTodo",
                success: function (data) {
                    alert(data.msg);
                
                }
            });*/
         
             $.ajax({
                url: "http://localhost:3000/todos",
                success: function (data) {
                   // alert(data.msg);
                    todo = data.data;
                    const event = new Event('todoListUpdated');
                    event.todos = todo;
                    window.dispatchEvent(event);
                }
            });
        },
        getAllActive: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });

            const event = new Event('todoListUpdated');
            event.todos = filteredTodo;
            window.dispatchEvent(event);
        },
        getAllCompleted: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return todoObj.isCompleted;
            });

            const event = new Event('todoListUpdated');
            event.todos = filteredTodo;
            window.dispatchEvent(event);
        },
        clearCompletedTodos: function () {
            todo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });

            // localStorage.setItem('todoList',JSON.stringify(todo));
            const event = new Event('todoListUpdated');
            event.todos = state === "COMPLETED" ? [] : todo;
            window.dispatchEvent(event);

            $.ajax({
                type: "PUT",
                data: JSON.stringify(todo),
                contentType: 'application/json',
                url: "http://localhost:3000/todos",
                success: function (data) {
                    alert(data.msg);
                }
            })
        },

        toggleTodoState: function (id) {
            todo = todo.map(function(todoObj) {
                if (todoObj.id === id) {
                    todoObj.isCompleted = !todoObj.isCompleted;

                }
                return todoObj;
            });
            // localStorage.setItem('todoList',JSON.stringify(todo));


            $.ajax({
                type: "PUT",
                contentType: 'application/json',
                url: "http://localhost:3000/todos",
                data: JSON.stringify(todo),
                success: function (data) {
                    alert(data.msg);
                    window.todos.getFilteredTodos();
                }
            })
        }
    };
})();