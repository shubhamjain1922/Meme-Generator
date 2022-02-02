import React from "react";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from "./components/Home";
import Gallary from "./components/Gallary";
import SignUp from "./components/signup";
import Login from "./components/login";
import Saved from "./components/Saved";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" exact element={<Gallary />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/meme" exact element={<Home />} />
        <Route path="/saved" exact element={<Saved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
