import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/zephyr/bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
