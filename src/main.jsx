import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MainContextProvider } from './contexts/mainContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <MainContextProvider>
    <App />
    </MainContextProvider>
)
