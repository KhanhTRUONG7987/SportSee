import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenSizeChecker from "./utils/ScreenSizeChecker.jsx";
import UserMenuHorizontal from "./components/UserMenuHorizontal.jsx";
import UserMenuVertical from "./components/UserMenuVertical.jsx";
import UserProfile from "./components/UserProfile.jsx";
import "./index.css";

const AppRoutes = () => {
  return (
    <Router>
      <ScreenSizeChecker />
      <UserMenuHorizontal />
      <UserMenuVertical />
  
      <Routes>
        <Route path="user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
