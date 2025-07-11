import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './Context/ToastContext.tsx'
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Toaster>
    <App />
    </Toaster>
    </BrowserRouter>
)
