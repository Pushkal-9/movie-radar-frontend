import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route, BrowserRouter } from "react-router-dom";
import './index.css';
import Home from './screens/home/Home';
import SelectShow from "./screens/search/SelectShow";





ReactDOM.render(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/selectshow/:city/:movie" element={<SelectShow/>} />
      </Routes>
    </BrowserRouter>
    </>,
    document.getElementById('root')
);
