import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CarContextProvider } from './Component/context/StoreContext'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <CarContextProvider>
        <App></App>
      </CarContextProvider>
    </BrowserRouter>
  </>
)
