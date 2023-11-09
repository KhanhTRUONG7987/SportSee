import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHeader from "./components/UserHeader";
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
      <UserProfile />
      <Routes>
        <Route path="user/:id" element={<UserHeader />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
