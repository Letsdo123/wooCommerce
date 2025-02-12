import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store,persistor } from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)
