import React, { useEffect, useState } from "react";
import { apiService } from "../services/apiService"; 
import "../styles/UserHeader.css";

// UserHeader component to display user information and achievements
const UserHeader = ({ userId }) => {
  // State to store user data
  const [user, setUser] = useState(null);

  // Fetch user main data when the component mounts or userId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user main data using the apiService
        const data = await apiService.getUserMainData(userId);
        setUser(data);
      } catch (error) {
        // Handle error if data fetching fails
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or userId changes
  }, [userId]); // Add userId to the dependency array to re-fetch data when userId changes

  // Render the UserHeader component
  return (
    <div className="user-header">
      {/* Greeting section with user's first name */}
      <div className="greeting">
        <p className="greeting-text">Bonjour</p>
        <p className="user-name">{user?.firstName}</p>
      </div>
      {/* Congratulations message */}
      <p className="congratulations">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default UserHeader;
