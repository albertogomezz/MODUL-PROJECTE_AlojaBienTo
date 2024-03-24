import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nConf } from './i18n/config.js'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nConf);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
)