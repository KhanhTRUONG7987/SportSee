import React from "react";
import { mockUserMainData } from "../services/mockData";
import "../styles/UserHeader.css";

const UserHeader = ({ userId }) => {
  const user = mockUserMainData.find((userData) => userData.id.toString() === userId);

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
