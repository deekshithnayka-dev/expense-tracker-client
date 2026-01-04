import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import View from './Pages/View';
import Add from './Pages/Add';
import Edit from './Pages/Edit';
import Error from './Pages/Error';
//import './App.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {


  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />

          {/* {not found page} */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
