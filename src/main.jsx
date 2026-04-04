import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext'
import { RoleProvider } from './context/RoleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RoleProvider>
        <App />
      </RoleProvider>
    </AppProvider>
  </StrictMode>,
)
