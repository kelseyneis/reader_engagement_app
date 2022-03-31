import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Reader from "./pages/Reader"
import Instructions from "./pages/Instructions"
import Layout from "./pages/Layout"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Instructions />} />
          <Route path="schoolmistress" element={<Reader story="schoolmistress"/>} />
          <Route path="chemistswife" element={<Reader story="chemistswife"/>} />
          <Route path="expensivelessons" element={<Reader story="expensivelessons"/>} />
        </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
