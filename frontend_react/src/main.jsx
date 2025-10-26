import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './redux/store/index.js'
import './i18n.js'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

// Import Bootstrap JS components individually to avoid Popper.js issues
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <HelmetProvider>
            <React.StrictMode>
              <ToastContainer />
              <App />
            </React.StrictMode>
          </HelmetProvider>
        </ThemeProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>
)