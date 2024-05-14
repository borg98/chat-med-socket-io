import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Chatrooms from "../Pages/Chatrooms";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Chatrooms" element={<Chatrooms />} />
    </Routes>
  );
};

export default AppRoutes;
