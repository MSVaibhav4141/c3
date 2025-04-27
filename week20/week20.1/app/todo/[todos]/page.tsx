type Params = {
    params:Promise<{
    todos:string}>
}

export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export const dynamicParams = false 

export async function generateStaticParams() {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json())
    

    return todos.map((i:Todo) => ({
        todos:i.id.toString()
    })).slice(0,10)
}

export default async function Todos({params}:Params) {
    
    const id = (await params).todos

    const todo:Todo = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => res.json())

    return(
        <div>{todo.title}</div>
    )
}