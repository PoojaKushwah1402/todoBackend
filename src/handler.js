(function () {
    function createSingleTodoStructure(todo) {
        let newdiv = document.createElement('div');
        let smalldiv = document.createElement('div');
        newdiv.className = 'injs';
        newdiv.textContent = todo.name;
        smalldiv.className = 'small';
        smalldiv.textContent = "X";
       

        let input = document.createElement('input');
        input.type = "checkbox";
        input.checked = todo.isCompleted;
        input.onchange = function() {
            window.todos.toggleTodoState(todo.id);
        };
        input.className='checkboxround';
        newdiv.appendChild(input);
        newdiv.appendChild(smalldiv);
        buttonfunction(smalldiv,todo.id);
        return newdiv;
    }

    function buttonfunction(smalldiv,id) {
        smalldiv.addEventListener("click",function(event){
            window.todos.removetodo(id);
            window.todos.getFilteredTodos();
        });
    }


    const todoInputSetup = function() {
        const inputElement = document.querySelector("#myInput");
        if (inputElement) {
            inputElement.addEventListener("keydown", function(event) {
                if(event.keyCode==13) {
                    const name = event.currentTarget.value;
                    
                    if(name !== "") {
                        window.todos.add(name);
                        event.currentTarget.value = ''; 
                    }
                }
            })
        } else {
            throw new Error("input element not found on line no 6 handler.js");
        }
    }

    const addActiveClass = function () {
        const allFilter = document.querySelector("#allFilter");
        const activeFilter = document.querySelector("#activeFilter");
        const completedFilter = document.querySelector("#completedFilter");

        allFilter.classList.remove("active");
        activeFilter.classList.remove("active");
        completedFilter.classList.remove("active");
    }

    const allFilter = function () {
        const allFilter = document.querySelector("#allFilter");
        if (allFilter) {
            allFilter.addEventListener("click", function() {
                window.todos.applyFilter("ALL");
                window.todos.getAllTodos();
                addActiveClass();
                allFilter.classList.add("active");
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }
    }


    const activeFilter = function () {
        const activeFilter = document.querySelector("#activeFilter");
        if (activeFilter) {
            activeFilter.addEventListener("click", function() {
                window.todos.applyFilter("ACTIVE");
                window.todos.getAllActive();
                addActiveClass("active");
                activeFilter.classList.add("active");
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }
    }

    
    const completedFilter = function(){
        const completedFilter = document.querySelector("#completedFilter");
        if (completedFilter) {
            completedFilter.addEventListener("click", function() {
                window.todos.applyFilter("COMPLETED");
                window.todos.getAllCompleted();
                addActiveClass("completed");
                completedFilter.classList.add("active");
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }

    }


    const clearCompletedtodo = function(){
        const clearCompletedtodo = document.querySelector("#clearCompleted");
        if(clearCompletedtodo) {
            clearCompletedtodo.addEventListener("click", function() {
                  window.todos.clearCompletedTodos();
            })       
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");  
        }
    }


    window.addEventListener('todoListUpdated', function (event) {
        const todoList = event.todos;
        const parent = document.getElementById('listItem');
        parent.innerHTML = '';

        for(i = 0;i < todoList.length; i++) {
            const div = createSingleTodoStructure(todoList[i]);
            parent.appendChild(div);
        }
        document.getElementById('second').innerHTML= todoList.length + " Item Left";
    });
    
   

        





    allFilter();
    clearCompletedtodo();
    activeFilter();
    completedFilter();
    todoInputSetup();
    
})();

   window.addEventListener("load", function (){
    window.todos.getSessiondata()
    });