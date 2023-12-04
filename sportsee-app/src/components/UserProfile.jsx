import React, { useState, useEffect } from "react";
import UserHeader from "./UserHeader";
import UserBarChart from "./UserBarChart";
import UserAverageSessionDuration from "./UserAverageSessionDuration";
import UserRadarChart from "./UserRadarChart";
import UserPieChart from "./UserPieChart";
import UserDailyEnergy from "./UserDailyEnergy";
import "../styles/UserProfile.css";
import { useParams } from "react-router-dom";
import { apiService } from "../services/apiService";

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
    <div className="user-profile">
      <UserHeader userId={id} />
      <UserBarChart userId={id} userMainData={userData} />
      <UserAverageSessionDuration userId={id} />
      <UserRadarChart userId={id} />   
      <UserPieChart userId={id} userMainData={userData} />   
      <UserDailyEnergy userId={id} />
    </div>
  );
};

export default UserProfile;
