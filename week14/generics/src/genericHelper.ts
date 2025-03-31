type GetFunctionType<T extends (...args:any) => any> = Awaited<ReturnType<T>>


const handlingError = async<T extends (...args:any[]) => any>(
    fn:T,
    ...args:Parameters<T>
):Promise<GetFunctionType<T> | null> => {
    try{
    const res = await fn(...args)
    return res
 }catch(error){
    console.log(error)
    return null // <-----------------------------------------
 } 
}


// Consider this another part of your code base from where we are calling error handeler function
const fetchTodo = async<Todo>(url:string):Promise<Todo[]> => {
    const response = await fetch(url)
    const todo = await response.json()
    return todo;
}

type Todo =  {
    userId: number,
    id: number,
     title: string,
    completed: boolean
}

async() => {
    const usera = await handlingError(fetchTodo<Todo>, 'https://dummy-json.mock.beeceptor.com/todos');
}

//YOu can see whenever you are callng error handleer like what does ths function return whthout actually seeing it 