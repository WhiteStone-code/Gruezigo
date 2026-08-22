import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { UserProgressProvider } from './context/UserProgressContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProgressProvider>
        <App />
      </UserProgressProvider>
    </LanguageProvider>
  </React.StrictMode>
)
