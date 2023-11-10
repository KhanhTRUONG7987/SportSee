import React from "react";
import UserHeader from "./UserHeader";
import UserBarChart from "./UserBarChart";
import "../styles/UserProfile.css";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="user-profile">
      <UserHeader userId={id} />
      <UserBarChart userId={id} />
    </div>
  );
};

export default UserProfile;
