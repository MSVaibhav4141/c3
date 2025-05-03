import {SERVER_URL} from '@repo/backend-common/config'
import { TodoComp } from './TodoComp'

export interface ITodo{
    id :string,
    title :string 
    completed  : boolean,
    createdAt :Date
}

export default async function TodosPage(){
    let data1, data;
    try{
         data1  = await fetch(`${SERVER_URL}/get/todsos`) || []
         data = await data1?.json();
         
        }
        catch(e){
            
            data = []
    }
    console.log(data)
    return(
        <div>
            
            <TodoComp data={data}/>
        </div>
    )

}