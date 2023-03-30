import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Reader from "./pages/Reader"
import Data from "./pages/Data"
import Instructions from "./pages/Instructions"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Highlight from "./pages/Highlight"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Instructions />} />
        <Route path="login" element={<Login />} />
        <Route path="highlight" element={<Highlight />} />
        <Route path="/read/schoolmistress" element={<Reader story="schoolmistress" participant="3" key="3"/>} />
        <Route path="/read/expensivelessons" element={<Reader story="expensivelessons" participant="3" key="3"/>} />
        <Route path="/data/expensivelessons" element={<Data story="expensivelessons" participant="2" key="2"/>} />
        <Route path="/data/schoolmistress" element={<Data story="schoolmistress" participant="2" key="0"/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
