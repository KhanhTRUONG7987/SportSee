import React from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import "../styles/UserRadarChart.css";
import { mockUserPerformance } from "../services/mockData";

const UserRadarChart = ({ userId }) => {
  const userPerformanceData = mockUserPerformance.find(
    (data) => data.userId === parseInt(userId)
  );

  if (!userPerformanceData) {
    console.error(`User performance data not found for ID: ${userId}`);
    return <p className="error-message">User performance data not found</p>;
  }

  // Custom tick formatter
  const formatTick = (value) => {
    const kindKeys = Object.keys(userPerformanceData.kind);
    const totalTicks = kindKeys.length;
    const formattedTickKey = kindKeys[(totalTicks - value - 1) % totalTicks];

    // customize tick names
    switch (formattedTickKey) {
      case "cardio":
        return "Cardio";
      case "energy":
        return "Energie";
      case "endurance":
        return "Endurance";
      case "strength":
        return "Force";
      case "speed":
        return "Vitesse";
      case "intensity":
        return "Intensité";
      default:
        return formattedTickKey; 
    }
  };

  return (
    <div className="user-radar-chart">
      <RadarChart
        className="polygons"
        outerRadius={90}
        width={258}
        height={263}
        data={userPerformanceData.data}
      >
        <PolarGrid />
        <PolarAngleAxis tickFormatter={formatTick} />
        <Radar name="User" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
      </RadarChart>
    </div>
  );
};

export default UserRadarChart;
