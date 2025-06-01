import { prismaClient  } from "db/client"
export default async function Home(){

  
  if (process.env.SKIP_DB === 'true') {
  return<></>; 
}
  const todos = await prismaClient.todo.findMany()
  

  return (
    <>
    {JSON.stringify(todos)}
    ksd
    </>
  )
}

export const revalidate = 60;