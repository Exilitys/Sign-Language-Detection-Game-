import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Camera from "./camera";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Camera' element={<Camera />} />
      </Routes>
    </>
  );
};

export default App;
