'use client'
import { Todo } from "@/app/todo/[todos]/page"
import { use, useEffect, useState } from "react"

export default  function Blog({params}:{params:Promise<{blog:string}>}) {
    const [post ,setPost] = useState<Todo>()

    const id = use<{blog:string}>(params).blog


    useEffect(() => {
        (async() =>{
        const post:Todo =  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
        setPost(post)})();

    },[id] )
    console.log(post,id)

    return(
        <div>
            {post && post.title}
        </div>
    )
}