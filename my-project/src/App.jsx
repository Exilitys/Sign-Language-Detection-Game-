import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Camera from "./camera";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Profile from "./Profile";
import Learn from "./Learn";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Camera' element={<Camera />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Learn' element={<Learn />} />
      </Routes>
    </>
  );
};

export default App;
