import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import AppWrapper from './components/wrappers/AppWrapper.tsx'
import { ToastContainer } from 'react-toastify'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
