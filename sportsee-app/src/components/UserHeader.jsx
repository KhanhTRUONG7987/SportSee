import React, { useEffect, useState } from "react";
import { apiService } from "../services/apiService"; // Import the apiService
import "../styles/UserHeader.css";

const UserHeader = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch user main data
        const data = await apiService.getUserMainData(userId);
        setUser(data);
      } catch (error) {
        // Handle error 
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // call the fetchData function when the component mounts
  }, [userId]); // add userId to the dependency array to re-fetch data when userId changes

  return (
    <div className="user-header">
      <div className="greeting">
        <p className="greeting-text">Bonjour</p>
        <p className="user-name">{user?.firstName}</p>
      </div>
      <p className="congratulations">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default UserHeader;
