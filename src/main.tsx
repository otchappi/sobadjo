import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NavBar from "./components/navbar/navBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/homePage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
