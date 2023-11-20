import React from "react";
import UserHeader from "./UserHeader";
import UserBarChart from "./UserBarChart";
import UserAverageSessionDuration from "./UserAverageSessionDuration";
import UserRadarChart from "./UserRadarChart";
import "../styles/UserProfile.css";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="user-profile">
      <UserHeader userId={id} />
      <UserBarChart userId={id} />
      <UserAverageSessionDuration userId={id} />
      <UserRadarChart userId={id} />    
    </div>
  );
};

export default UserProfile;
