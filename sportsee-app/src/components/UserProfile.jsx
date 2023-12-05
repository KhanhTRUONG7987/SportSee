import React, { useState, useEffect } from "react";
import UserHeader from "./UserHeader";
import UserBarChart from "./UserBarChart";
import UserAverageSessionDuration from "./UserAverageSessionDuration";
import UserRadarChart from "./UserRadarChart";
import UserPieChart from "./UserPieChart";
import UserDailyEnergy from "./UserDailyEnergy";
import UserMenuHorizontal from "./UserMenuHorizontal.jsx";
import UserMenuVertical from "./UserMenuVertical.jsx";
import { useParams } from "react-router-dom";
import { apiService } from "../services/apiService";
import "../styles/UserProfile.css";
import ScreenSizeChecker from "../utils/ScreenSizeChecker";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userMainData = await apiService.getUserMainData(id);
        setUserData(userMainData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <ScreenSizeChecker>
      <UserMenuHorizontal />
      <UserMenuVertical />
      <div className="user-profile">
        <UserHeader userId={id} />
        <UserBarChart userId={id} userMainData={userData} />
        <UserAverageSessionDuration userId={id} />
        <UserRadarChart userId={id} />
        <UserPieChart userId={id} userMainData={userData} />
        <UserDailyEnergy userId={id} />
      </div>
    </ScreenSizeChecker>
  );
};

export default UserProfile;
