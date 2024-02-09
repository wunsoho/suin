import React, { useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/Main/Main";
import Deatil1 from "./component/Detail/Detail1";
import Reserve1 from "./component/Reserve/Reserve1";
import Status from "./component/Re_status/Status";
import Review from "./component/Review/Review";
import Return from "./component/Return/Return";
import './App.css';
import Alarm from "./component/Alarm/Alarm";
import History from "./component/History/History";
import Camera from "./component/Return/Camera";

function App() {  
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);
  return (  
    <BrowserRouter>
    <div>
      <Routes>
        <Route path ="/" element={<Main/>}/>
        <Route path ="/facility/:id" element={<Deatil1/>}/>
        <Route path ="/facility/:id/reserve1" element = {<Reserve1/>}/>
        <Route path ="/status" element={<Status/>}/>
        <Route path ="/review" element={<Review/>}/>
        <Route path ="/return" element={<Return/>}/>
        <Route path ="/Alarm" element={<Alarm/>}/>
        <Route path ="/history" element={<History/>}/>
        <Route path ="/Info" element={<Camera/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
