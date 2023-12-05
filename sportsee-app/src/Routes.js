import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile.jsx";
import "./index.css";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
