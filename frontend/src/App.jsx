import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Registed from "./pages/Registed";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFoud from "./pages/PageNotFoud";

function App() {
  return(
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<PageNotFoud />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
