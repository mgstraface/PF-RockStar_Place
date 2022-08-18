import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomeUNL from "./Components/Home/HomeUNL";
import "./App.css";
import Help from "./Components/Help/Help";
import Faqs from "./Components/Faqs/Faqs";

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppStyle>
      <Routes>
        <Route exact path="/" element={<HomeUNL />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/faqs" element={<Faqs />} />
      </Routes>
    </AppStyle>
  );
}

export default App;
