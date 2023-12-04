import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { apiService } from "../services/apiService"; // Import the apiService
import "../styles/UserPieChart.css";

const COLORS = ["#FF0000", "#fff"];

const UserPieChart = ({ userId }) => {
  const [userMainData, setUserMainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getUserMainData(userId);
        setUserMainData(data);
      } catch (error) {
        console.error("Error fetching user main data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userMainData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-pie-chart">
      <div className="background"></div>
      <span className="score">Score</span>
      <div className="pie-chart">
        <PieChart width={218} height={218}>
          <Pie
            data={[
              { value: userMainData.todayScore * 100 },
              { value: 100 - userMainData.todayScore * 100 },
            ]}
            cx={109}
            cy={109}
            innerRadius={80}
            outerRadius={90}
            startAngle={90}
            endAngle={userMainData.todayScore * 360}
            fill="#FF0000"
            dataKey="value"
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </div>
     
      <span>
        <span className="KPI">{userMainData.todayScore * 100}%</span>
        <span className="text-span"> de votre objectif</span>
      </span>
    </div>
  );
};

export default UserPieChart;