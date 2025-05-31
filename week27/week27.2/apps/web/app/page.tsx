import { prismaClient  } from "db/client"
import { todo } from "node:test"
export default async function Home(){

  
  const todos = await prismaClient.todo.findMany()
  console.log(todo)
  return (
    <>
    {JSON.stringify(todos)}
    ksd
    </>
  )
}

