import React, { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import "../styles/UserRadarChart.css";
import { apiService } from "../services/apiService";

const UserRadarChart = ({ userId }) => {
  // State to store user performance data and error
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user performance data from the API
  useEffect(() => {
    const fetchUserPerformanceData = async () => {
      try {
        const performanceData = await apiService.getUserPerformance(userId);
        setUserPerformanceData(performanceData);
        setError(null);
      } catch (error) {
        console.error(
          `Error fetching user performance data for ID ${userId}:`,
          error.message
        );
        setError(`Failed to fetch user performance data: ${error.message}`);
      }
    };

    fetchUserPerformanceData();
  }, [userId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!userPerformanceData) {
    return <p>Loading...</p>;
  }

  // Custom tick formatter for radar chart
  const formatTick = (value) => {
    const kindKeys = Object.keys(userPerformanceData.kind);
    const totalTicks = kindKeys.length;
    const formattedTickKey = kindKeys[(totalTicks - value) % totalTicks];

    // Customize tick names based on kind key
    switch (formattedTickKey) {
      case "1":
        return "Cardio";
      case "2":
        return "Energie";
      case "3":
        return "Endurance";
      case "4":
        return "Force";
      case "5":
        return "Vitesse";
      case "6":
        return "Intensité";
      default:
        return formattedTickKey;
    }
  };

  // Render the RadarChart component
  return (
    <div className="user-radar-chart">
      <RadarChart
        width={258}
        height={263}
        cx="50%"
        cy="50%"
        outerRadius="66%"
        data={userPerformanceData.data}
      >
        <PolarGrid />
        <PolarAngleAxis
          tickFormatter={formatTick}
          dataKey="kind"
          tickSize={15}
          tick={{ fontSize: 3, dy: 3 }}
        />
        <Radar name="User" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
      </RadarChart>
    </div>
  );
};

export default UserRadarChart;
