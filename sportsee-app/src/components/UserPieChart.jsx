import React from "react";
import "../styles/UserPieChart.css";
import { mockUserMainData } from "../services/mockData";

const UserPieChart = ({ userId }) => {
  // Find user main data from mockUserMainData
  const userMainData = mockUserMainData.find(
    (data) => data.id === parseInt(userId)
  );

  // Check if data is available
  if (!userMainData) {
    console.error(`User main data not found for ID: ${userId}`);
    return <p className="error-message">User main data not found</p>;
  }

  return (
    <div className="user-pie-chart">
      <div className="background"></div>
      <span className="score">Score</span>
      <div className="pie-chart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="219"
          height="218"
          viewBox="0 0 219 218"
          fill="none"
        >
          <path
            d="M67.3446 35.5144C26.8384 58.9007 12.96 110.696 36.3462 151.202C59.7324 191.708 111.527 205.586 152.034 182.2C192.54 158.814 206.418 107.019 183.032 66.5128C159.646 26.0066 107.851 12.1282 67.3446 35.5144Z"
            fill="white"
            stroke="url(#paint0_angular_2_136)"
            stroke-width={userMainData.todayScore * 10}
          />
          <path
            d="M36 155.168C38.7614 155.168 41 152.93 41 150.168C41 147.407 38.7614 145.168 36 145.168C33.2386 145.168 31 147.407 31 150.168C31 152.93 33.2386 155.168 36 155.168Z"
            fill="#FF0000"
          />
          <path
            d="M117 29.6682C119.761 29.6682 122 27.4296 122 24.6682C122 21.9068 119.761 19.6682 117 19.6682C114.239 19.6682 112 21.9068 112 24.6682C112 27.4296 114.239 29.6682 117 29.6682Z"
            fill="#FF0000"
          />
          <defs>
            <radialGradient
              id="paint0_angular_2_136"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(109.689 108.857) rotate(-30) scale(79.6891)"
            >
              <stop offset="0.502628" stop-color="#FBFBFB" />
              <stop offset="0.502728" stop-color="#FF0000" />
              <stop offset="0.845963" stop-color="#FF0000" />
              <stop offset="0.846063" stop-color="#FBFBFB" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <text>
        <span className="KPI">{userMainData.todayScore * 100}%</span>
        <span className="text-span"> de votre objectif</span>
      </text>
    </div>
  );
};

export default UserPieChart;
