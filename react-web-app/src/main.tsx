import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/cyborg/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
