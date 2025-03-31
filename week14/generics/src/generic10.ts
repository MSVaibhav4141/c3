//We can use  infer the types from several libraries as well. Like Zod in this case
import {z} from 'zod'

const fetchTodos = <TData>(
    url:string,
    schema: z.Schema<TData>
): Promise<TData> => {
    return fetch(url)
    .then(res => res.json())
    .then((res) => {
        return schema.parse(res)
    })

}

(async() => {
    const todos = await fetchTodos('https://dummy-json.mock.beeceptor.com/todos',z.array(z.object({
        userId: z.number(),
        id: z.number(),
         title: z.string(),
        completed: z.boolean()
    })) )
    console.log(todos)
})();

//Zod will throw error if api response changes and inaccurate according to the requirement