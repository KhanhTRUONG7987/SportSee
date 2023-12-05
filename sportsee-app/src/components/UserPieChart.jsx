import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { apiService } from "../services/apiService";
import "../styles/UserPieChart.css";

const UserPieChart = ({ userId }) => {
  // State to store user's score
  const [userScore, setUserScore] = useState(null);

  // Fetch user main data when the component mounts or userId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user main data using the apiService
        const data = await apiService.getUserMainData(userId);
        const score = data.todayScore;
        setUserScore(score);
      } catch (error) {
        console.error("Error fetching user main data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or userId changes
  }, [userId]); // Add userId to the dependency array to re-fetch data when userId changes

  // Calculate start and end angles for the colored pie segment based on the user's score
  const startAngle = 90;
  const endAngle = startAngle + (userScore || 0) * 360;

  // Custom label for the pie chart showing the user's score percentage
  const customLabel = () => {
    const score = userScore ? userScore : 0;
    return (
      <span>
        <span className="custom-label">
          <span className="custom-score">{`${score * 100}%`}</span>
          <span className="text-span"> de votre objectif</span>
        </span>
      </span>
    );
  };

  // Render the UserPieChart component
  return (
    <div className="user-pie-chart">
      <span className="subtitle">Score</span>

      {customLabel()}

      <ResponsiveContainer width="100%" height="100%">
        {/* PieChart component with background and colored pie segments */}
        <PieChart width={358} height={358}>
          {/* Background pie with a white inner part */}
          <Pie
            data={[{ value: 1 }]}
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={0}
            startAngle={0}
            endAngle={360}
            dataKey="value"
            labelLine={false}
            cornerRadius={50}
            fill="#FFFFFF"
          />
          {/* Colored pie segment on top representing the user's score */}
          <Pie
            data={[{ value: userScore }]}
            cx="50%"
            cy="50%"
            outerRadius={88}
            innerRadius={75}
            startAngle={startAngle}
            endAngle={endAngle}
            dataKey="value"
            labelLine={false}
            cornerRadius={50}
            fill="#FF0000"
          ></Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPieChart;
