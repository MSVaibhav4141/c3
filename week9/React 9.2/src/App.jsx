import { useEffect, useState } from 'react'
import './App.css'

// function App() {

//   const [count, setCount] = useState(0)
//   return (
//     <>
//     <Counter count={count}/>
//     <button onClick={() => setCount(p => p + 1)}>Add</button>
//     </>
//   )
// }

// function Counter({count}) {

//   useEffect(() => {
//     console.log("mount", count)

//     return () => {
//       console.log('cleanup', count)
//     }
//   }, [count])
//   return<>
// <div>Counter {count}</div>
// </>
// }


// week 9.3
function App(){
  return <>
  {/* <Parent>
    <div>
      Hi I am a children of Parent Component
      <div>
        <input placeholder='Write whatever you want'></input>
      </div>
    </div>
  </Parent> */}
  <div onClick={() => console.log('ii')} style={{position:'fixed', left:'46px', top:'10px', width:'100px', height:'100px', backgroundColor:'red', opacity:50,zIndex:0}}></div>
{/* <iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
<iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/T-2jliitju4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe> */}

  </>
}

// As we can see wrapped content of custom component can be accessed as child in parents wrapped component
// function Parent({children}){
//   return <>
//   <div style={{padding:'10px', background:'crimson', border:'0.5px solid'}}>
//   {children}
//   </div>
//   </>
// }

export default App
