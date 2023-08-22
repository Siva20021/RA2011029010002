import React from 'react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Home from './Pages/Home';
import TrainDetail from './Pages/TrainDetail';
const App = () => {
  return(
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/train" element={<TrainDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;