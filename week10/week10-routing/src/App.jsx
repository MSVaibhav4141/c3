import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  
  return(<>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/app' element={<Blog />} />
    </Routes>
  </>)
}

function Landing(){
  return<>
  Hey, I am a landing page!!
  </>
}

function Blog() {
  return<>
  Its my blog
  </>
}

export default App
