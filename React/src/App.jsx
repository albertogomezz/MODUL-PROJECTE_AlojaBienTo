import AppRouter from './Router/AppRouter'
import './App.css'
import Footer from "./components/Footer/Footer";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nConf } from './i18n/config.js'

export function App() {
  return (
    <>
      <AppRouter/>
      <br /><br />
      <Footer/>
    </>
  );
}

export default App