    const h1 = document.querySelector('h1')
    const todos = document.querySelectorAll('h4')
    const input = document.getElementById('inp')
    console.log(h1)

    function deleteTodo(todo){
        if(!todos[todo].parentElement?.removeChild(todos[todo])){
            alert('No Element')
        }
        todos[todo].parentElement.removeChild(todos[todo])
        todos.splice(todo,1)
        console.log(todos)
    }
    function deleteRandomTodo() {
        const element = document.querySelector("h4");
        const parentElement = element.parentNode;
        parentElement.removeChild(element);
    }

    function addTodo() {
        const inputValue = input.value;
        const div = document.createElement('div')
        const h4 = document.createElement('h4')
        h4.innerText = inputValue;
        const but = document.createElement('button')
        but.innerHTML = 'delete'
        but.addEventListener('click', () => {
            div.remove();
        })
        div.appendChild(h4).appendChild(but)
        const body = document.getElementsByClassName('todo_container')
        body[0].appendChild(div)
    }

    todos[1].innerText = "2. Go"