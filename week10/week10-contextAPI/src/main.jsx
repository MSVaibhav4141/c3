import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App1 from './App1Contenxt.jsx'
import App2Recoil from './App2Recoil.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2Recoil />
    {/* <App1 /> */}
    {/* <App /> */}
  </StrictMode>,
)
