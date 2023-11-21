import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
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
    return userPerformanceData.kind[value + 1];
  };

  return (
    <div className="user-radar-chart">
      <RadarChart
        className="polygons"
        outerRadius={90}
        width={180}
        height={180}
        data={userPerformanceData.data}
      >
        <PolarGrid />
        <PolarAngleAxis tickFormatter={formatTick} />
        <Radar
          name="User"
          dataKey="value"
          fill="#FF0101"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>
  );
};

export default UserRadarChart;
