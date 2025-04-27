import { Todo } from "./[todos]/page";

export default async function Todo1(){
    const todo:Todo = await fetch('https://jsonplaceholder.typicode.com/todos/11', {
        cache: 'force-cache', // (default behavior) cache at build time
      }).then(res => res.json());
    return(
        <div>{todo.title}</div>
    )
}