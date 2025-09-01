import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import {  StoreContextProvider } from './Component/context/StoreContext'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
    {/* makes your global store available */}
      <StoreContextProvider>
        <App></App>
      </StoreContextProvider>
    </BrowserRouter>
  </>
)
