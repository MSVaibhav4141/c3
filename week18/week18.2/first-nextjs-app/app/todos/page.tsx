import axios from "axios";

type ITodo =  {
"userId": number,
"id": number,
"title": string,
"completed": boolean
}

const getTodo = async(url:string) : Promise<ITodo[]> => {
    const {data} = await axios.get<ITodo[]>(url)
    return data;
}

export default async function Todos() {

    const todos = await getTodo('https://jsonplaceholder.typicode.com/todos')

    return(
        <>
        {todos.map((i, index) => (
            <div key={index}>
                <div>{i.title}</div>
                <div>{i.completed}</div>
            </div>
        ) )}
        </>
    )
}

// go to networks tab and you will see its an ssr also without waterfall problem since its an ssr