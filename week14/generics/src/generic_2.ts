//Generic Functions
const makeRequest = async <TData>(api : string) : Promise<TData[]>=> {
    const res = await fetch(api);
    const todo = await res.json()
    return todo;
}


type TData = {
    userId: number,
    id: number,
     title: string,
    completed: boolean
}

(async() =>{
    const todos =  await makeRequest<TData>('https://dummy-json.mock.beeceptor.com/todos')
    todos.forEach((i) => console.log(i.title))  // Now it automatically infer the content like i.title
})();
