import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "../styles/UserPieChart.css";
import { mockUserMainData } from "../services/mockData";

const COLORS = ["#FF0000", "#fff"];

const UserPieChart = ({ userId }) => {
  const userMainData = mockUserMainData.find(
    (data) => data.id === parseInt(userId)
  );

  if (!userMainData) {
    console.error(`User main data not found for ID: ${userId}`);
    return <p className="error-message">User main data not found</p>;
  }

  return (
    <div className="user-pie-chart">
      <div className="background"></div>
      <span className="score">Score</span>
      <div className="pie-chart">
        <PieChart width={218} height={218}>
          <Pie
            data={[{ value: userMainData.todayScore * 100 }, { value: 100 - userMainData.todayScore * 100 }]}
            cx={109}
            cy={109}
            innerRadius={80}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            fill="#FF0000"
            dataKey="value"
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <text>
        <span className="KPI">{userMainData.todayScore * 100}%</span>
        <span className="text-span"> de votre objectif</span>
      </text>
    </div>
  );
};

export default UserPieChart;
