import {SERVER_URL} from '@repo/backend-common/config'
import { TodoComp } from './TodoComp'

export interface ITodo{
    id :string,
    title :string 
    completed  : boolean,
    createdAt :Date
}

export default async function TodosPage(){
    const data1  = await fetch(`${SERVER_URL}/get/todos`)
    const data = await data1?.json()
    console.log(data)
    return(
        <div>
            
            <TodoComp data={data}/>
        </div>
    )

}