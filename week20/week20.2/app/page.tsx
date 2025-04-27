'use client'
import { SessionContext, SessionProvider, signIn, signOut, useSession } from "next-auth/react"

export default function Home(){
 
 
  return <SessionProvider>
      <MainComp />
    </SessionProvider>
  
  
}


const MainComp = () => {
  const {data, status} = useSession()
  return(
    <div>
      {status==='authenticated' && (<button onClick={() => signOut()} >SignOut</button>)}
      {status==='unauthenticated' && (<button onClick={() => signIn()} >Signin</button>)}
    </div>
  )
}    