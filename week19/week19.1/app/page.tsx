import axios from "axios";
import Link from "next/link";

export default async function Home(){

  const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

  return(
  <div className="flex items-center justify-center flex-col">
    <div>
    <h1>{data.title}</h1>
    <h1>Todo Application</h1>
    <Link href={'/signup'}>Signup</Link>
    <Link href={'/signin'}>Signin</Link>
    </div>
  </div>
  )
}