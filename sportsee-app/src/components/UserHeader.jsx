import React from "react";
import { useParams } from "react-router-dom";
import { mockUserMainData } from "../services/mockData";
import "../styles/UserHeader.css";

const UserHeader = () => {
  const { id } = useParams();
  const user = mockUserMainData.find(
    (userData) => userData.id.toString() === id
  );

  if (!user) {
    console.log("User not found for ID:", id);
    return null;
  }

  return (
    <div className="user-header">
      <div className="greeting">
        <p className="greeting-text">Bonjour</p>
        <p className="user-name">{user?.userInfos.firstName}</p>
      </div>
      <p className="congratulations">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default UserHeader;
