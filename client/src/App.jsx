import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import { useEffect } from "react";

function App(){
 

  return(
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  </Router>
  )
  
}

export default App;
